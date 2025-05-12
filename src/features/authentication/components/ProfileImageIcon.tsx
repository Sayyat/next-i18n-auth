/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import { useProfile } from "@/features/authentication/hooks/useProfile";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { User, XCircle } from "lucide-react";
import { cn, toAbsolutePath } from "@/shared";
import React, { useState } from "react";

interface ProfileImageIconProps {
  className?: string;
}

/**
 * Hook to get user profile image with fallback handling.
 * @returns {JSX.Element} - The user profile image or initials
 */
export function ProfileImageIcon({ className }: ProfileImageIconProps) {
  const { data: profile, isLoading } = useProfile();

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  if (isLoading) {
    return (
      <Skeleton className={cn("size-9 rounded-full bg-green-500", className)} />
    );
  }

  if (profile?.image_url) {
    const absoluteImageUrl = toAbsolutePath(profile.image_url);
    return (
      <>
        <img
          src={absoluteImageUrl}
          alt="Profile"
          className={cn(
            "size-9 rounded-full object-cover border-2 border-green-500 cursor-pointer",
            className,
          )}
          onClick={() => setIsImageModalOpen(true)}
        />
        {/* Fullscreen Image Modal */}
        {isImageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-screen h-screen p-4 bg-white">
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute top-2 right-2 text-white bg-black p-1 rounded-full"
              >
                <XCircle className="h-6 w-6" />
              </button>
              <div className="flex items-center justify-center w-full h-full">
                <img
                  src={absoluteImageUrl}
                  alt="Full-Screen Image"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (profile?.firstname || profile?.lastname) {
    const initials = `${profile.firstname?.[0] || ""}${profile.lastname?.[0] || ""}`;
    return (
      <div
        className={cn(
          "size-9 flex items-center justify-center rounded-full bg-muted text-primary text-3xl font-medium",
          className,
        )}
      >
        {initials.toUpperCase()}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "size-9 flex items-center justify-center rounded-full bg-muted",
        className,
      )}
    >
      <User className="w-full h-full text-muted-foreground" />
    </div>
  );
}
