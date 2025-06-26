# Centralized API Request Handling and Translations for Server and Client

## Philosophy Behind Centralized API Request Handling and Translations

Centralized handling of API requests and error translations offers numerous advantages for large-scale applications, both in terms of code quality and maintainability. The idea behind centralization is to reduce duplication, streamline error management, and ensure consistent behavior across the client and server sides.

### Key Reasons for Centralization:

1. **Consistency**: By centralizing API request handling and error translations, we ensure that the same pattern is followed across both client and server. This leads to uniform behavior and predictable results in how API errors and responses are handled.

2. **Reusability**: Instead of duplicating error-handling logic in every component, we abstract that logic into a reusable function or service. This allows you to reuse the same error handling across the app, reducing code duplication and improving maintainability.

3. **Separation of Concerns**: By offloading API requests and error handling to dedicated services, your components focus solely on what they are supposed to do: render data and interact with the user. This makes your codebase more modular and easier to reason about.

4. **Simplified Debugging and Updates**: When you need to update your error-handling logic or change the way you interact with an API (e.g., modifying headers, authentication tokens, etc.), you can do it in one place rather than updating every individual API request.

5. **Translation Integration**: Centralizing the translation of error messages ensures that they are applied uniformly across the application, ensuring consistency in the user experience.

## Elegant Code for Server-Side Requests

On the server side, handling API requests and errors is simplified using Axios and a central `handleResponse` function. This function allows you to wrap all requests and handle errors in a centralized way. The translation of error messages is integrated by using the `getTranslation` function from the server, ensuring that all errors are returned in the correct language based on user preferences.

### Server-Side Code Example

Here's an elegant way to handle requests and errors on the server:

```typescript
const apiClient = axios.create({
    baseURL: env.API_URL,
    headers: { "Content-Type": "application/json" },
});

async function handleResponse<T>(request: Promise<any>): Promise<IResponse<T>> {
    try {
        const response = await request;
        return { success: true, data: response.data as T };
    } catch (error) {
        const { t } = await getTranslation("shared.services.api"); // Fetch translation for errors
        const extractedError = await extractErrorMessage(error, t); // Handle and translate error
        return { success: false, error: extractedError };
    }
}

export const getWithHandle = async <T>(url: string): Promise<IResponse<T>> =>
    await handleResponse<T>(apiClient.get(url));

export const postWithHandle = async <T>(url: string, payload: unknown): Promise<IResponse<T>> =>
    await handleResponse<T>(apiClient.post(url, payload));

export const patchWithHandle = async <T>(url: string, payload: unknown): Promise<IResponse<T>> =>
    await handleResponse<T>(apiClient.patch(url, payload));
```

### Key Benefits of This Approach:

* **Elegance**: Each request function (`getWithHandle`, `postWithHandle`, etc.) is written in just a couple of lines, reducing redundancy and keeping the code concise.
* **Centralized Error Handling**: Error handling is abstracted into the `handleResponse` function, making it easy to maintain and update error-handling logic across the application.
* **Translation Integration**: Errors are automatically translated based on user preferences, providing a consistent multilingual experience.

## Client-Side Request Handling with useTranslation

In the client-side code, we wanted to achieve the same level of elegance as on the server side. However, due to the requirement to use `useTranslation` for dynamic translation in the client environment, we had to introduce the `useCentralApi` hook, which, although semantically awkward, provides a consistent solution for centralized API handling.

### Client-Side Code Example

```typescript
const apiClient = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
    async (config) => {
        let token = tokenStore.get();
        if (!token) {
            const session = await getSession();
            token = session?.access ?? null;
            tokenStore.set(token); // Save token
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

function useHandleResponse() {
    const { t } = useTranslation("shared.services.api");

    return async function handleResponse<T>(request: Promise<any>): Promise<IResponse<T>> {
        try {
            const response = await request;
            return { success: true, data: response.data as T };
        } catch (error) {
            const extracted = await extractErrorMessage(error, t); // Extract and translate error
            return { success: false, error: extracted };
        }
    };
}

export function useCentralApi() {
    const handleResponse = useHandleResponse();

    return useMemo(
        () => ({
            getWithHandle: <T>(url: string) => handleResponse<T>(apiClient.get(url)),
            postWithHandle: <T>(url: string, payload: unknown) =>
                handleResponse<T>(apiClient.post(url, payload)),
            patchWithHandle: <T>(url: string, payload: unknown) =>
                handleResponse<T>(apiClient.patch(url, payload)),
            postFormWithHandle: <T>(url: string, formData: FormData) =>
                handleResponse<T>(apiClient.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } })),
        }),
        [apiClient, handleResponse]
    );
}
```

### Why This Approach Is Acceptable:

1. **Consistency**: Even though we had to use `useTranslation`, the error-handling logic remains centralized in the `useHandleResponse` function. This ensures consistency in how API responses and errors are processed across both client and server sides.
2. **Elegance**: The code for handling API requests is still concise, with just a few lines for each request type (`getWithHandle`, `postWithHandle`, etc.).
3. **Performance**: Memoizing the `useCentralApi` hook ensures that the methods do not unnecessarily re-render, maintaining performance.
4. **Translation**: While we need to use `useTranslation` on the client side, it doesn't detract from the overall goal of centralizing error handling and translation logic.

### Example of Usage in Client-Side Features

```typescript
export const useAuthenticationApi = (): IAuthenticationApi => {
    const api = useCentralApi();

    const resetPassword = (payload: IResetPayload): Promise<IResponse<IResetResponse>> => {
        return api.postWithHandle<IResetResponse>("/api/password-reset/", { email: payload.email });
    };

    const getCities = (): Promise<IResponse<IPaginatedResponse<ICity>>> =>
        api.getWithHandle<IPaginatedResponse<ICity>>("/api/cities/");

    return {
        resetPassword,
        getCities,
    };
};
```

### Example of Usage in Server-Side Features

```typescript
export const registerUser = async (payload: IRegisterPayload): Promise<IResponse<IUser>> =>
    await postWithHandle<IUser>("/api/auth/register/", payload);

export const loginUser = async (payload: ILoginPayload): Promise<IResponse<IUser>> =>
    await postWithHandle<IUser>("/api/auth/login/", payload);
```

## Elegance in Code

* **Server-side**: The server-side code is concise and handles API requests and errors in just a few lines, abstracting the complexity of error handling and translation into reusable functions like `handleResponse`.
* **Client-side**: Although we had to introduce `useTranslation`, the client-side code still follows a clean and modular approach with `useCentralApi`, ensuring the error handling and translations are managed centrally. Despite the requirement for `useTranslation`, the logic remains consistent and elegant.

### Conclusion

Centralizing API request handling and error translation across both client and server simplifies your codebase by making it more consistent, reusable, and maintainable. Despite some complexity introduced by `useTranslation` in the client-side, the overall architecture ensures that error handling is applied consistently and efficiently. This approach makes both the client and server interactions with external services uniform, reducing code duplication and improving scalability.
