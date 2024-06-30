import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Mobile() {
  const router = useRouter();

  useEffect(() => {
    router.push(
      "https://play.google.com/store/apps/details?id=com.jakeo.linked"
    );
  }, [router]);

  return null;
}
