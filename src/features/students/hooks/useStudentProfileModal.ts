"use client";

import { useEffect, useState } from "react";
import { getStudentProfile } from "../api/student.api";
import { StudentProfile } from "../types/student.types";

export function useStudentProfileModal(open: boolean, studentId: number | null, onClose: () => void) {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [prevId, setPrevId] = useState<number | null>(null);
  const [prevOpen, setPrevOpen] = useState(false);

  if (open !== prevOpen || studentId !== prevId) {
    setPrevOpen(open);
    setPrevId(studentId);
    if (open && studentId) {
      setIsLoading(true);
      setIsError(false);
    }
  }

  useEffect(() => {
    if (!open || !studentId) return;
    
    let isMounted = true;
    
    getStudentProfile(studentId)
      .then((data) => {
        if (isMounted) setProfile(data);
        console.log(data);
      })
      .catch((err) => {
        console.error("Fetch student profile error:", err);
        if (isMounted) setIsError(true);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [open, studentId]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return {
    profile,
    isLoading,
    isError,
    retry: () => {
      if (studentId) {
        setIsLoading(true);
        setIsError(false);
        getStudentProfile(studentId)
          .then((data) => setProfile(data))
          .catch(() => setIsError(true))
          .finally(() => setIsLoading(false));
      }
    }
  };
}
