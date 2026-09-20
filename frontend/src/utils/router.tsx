import React, { forwardRef, useEffect, useState } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";

export type NavigateFunction = (
  to: string | number,
  options?: { state?: any; replace?: boolean }
) => void;

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to?: string;
  href?: string;
  children?: React.ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, href, children, ...rest }, ref) => {
    const destination = to || href || "#";
    return (
      <NextLink href={destination} ref={ref} {...rest}>
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";

export const useNavigate = (): NavigateFunction => {
  const router = useRouter();

  return (to: string | number, options?: { state?: any; replace?: boolean }) => {
    if (typeof to === "number") {
      if (to < 0) {
        router.back();
      }
      return;
    }

    if (options?.state !== undefined && typeof window !== "undefined") {
      try {
        sessionStorage.setItem("__nav_state__", JSON.stringify(options.state));
      } catch (err) {
        console.error("Failed to persist navigation state", err);
      }
    }

    if (options?.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
};

export interface CustomLocation {
  pathname: string;
  asPath: string;
  search: string;
  state: any;
}

export const useLocation = (): CustomLocation => {
  const router = useRouter();
  const [state, setState] = useState<any>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("__nav_state__");
        if (stored) {
          setState(JSON.parse(stored));
        }
      } catch {
        setState(undefined);
      }
    }
  }, [router.asPath]);

  const searchIndex = router.asPath.indexOf("?");
  const search = searchIndex !== -1 ? router.asPath.slice(searchIndex) : "";

  return {
    pathname: router.pathname,
    asPath: router.asPath,
    search,
    state,
  };
};

export const useParams = <
  T extends Record<string, string | string[] | undefined> = Record<
    string,
    string | undefined
  >
>(): T => {
  const router = useRouter();
  return (router.query || {}) as T;
};

export const useSearchParams = (): [URLSearchParams] => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<URLSearchParams>(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const qIndex = router.asPath.indexOf("?");
      const qs = qIndex !== -1 ? router.asPath.slice(qIndex) : "";
      setSearchParams(new URLSearchParams(qs));
    }
  }, [router.asPath]);

  return [searchParams];
};

export interface NavigateProps {
  to: string;
}

export const Navigate: React.FC<NavigateProps> = ({ to }) => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      router.replace(to);
    }
  }, [router, to]);

  return null;
};

export default Link;
