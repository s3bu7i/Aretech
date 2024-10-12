import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json as json$1 } from "@remix-run/node";
import { RemixServer, useLocation, Link, Outlet, json, useLoaderData, Meta, Links, ScrollRestoration, Scripts, useNavigate, useSearchParams } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { X, Camera, Home, Users, Wallet, CircleUserRound, Leaf, Receipt, Sparkles, ChevronRight, ChevronUp, ChevronDown, ShoppingBag, Calendar, Award, Trophy, Search, Check, Circle, ArrowDown } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast, Toaster } from "sonner";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { jwtDecode } from "jwt-decode";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const useBalanceStore = create()(
  devtools(
    persist(
      (set) => ({
        balance: 0,
        setBal: (bal) => set(() => ({ balance: bal })),
        memberId: null,
        setMemberId: (id) => set(() => ({ memberId: id }))
      }),
      { name: "balanceStore" }
    )
  )
);
function Header() {
  const balance = useBalanceStore((state) => state.balance);
  return /* @__PURE__ */ jsxs("header", { className: "flex justify-between items-center p-4 bg-white text-green-600 border-b border-gray-200 sticky top-0 z-50", children: [
    /* @__PURE__ */ jsx(Profile$1, { className: "size-8" }),
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold absolute left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text", children: "EcoRewards" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-green-100 rounded-full px-3 py-1", children: [
      /* @__PURE__ */ jsx(CoinStack, { className: "size-4 mr-1" }),
      /* @__PURE__ */ jsx("span", { className: "text-green-600 font-semibold text-sm", children: balance })
    ] })
  ] });
}
const Profile$1 = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    viewBox: "0 0 24 24",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      }
    )
  }
);
const CoinStack = (props) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", ...props, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" }) });
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
function ScanDialog({ onScan }) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { className: "absolute left-1/2 -translate-x-1/2 -top-3 p-1 bg-white rounded-full shadow-[0_-3px_3px_-3px_rgba(0,0,0,0.25)]", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center", children: /* @__PURE__ */ jsx(Camera, { className: "h-6 w-6 text-white" }) }) }) }),
    /* @__PURE__ */ jsxs(
      DialogContent,
      {
        className: "max-h-[calc(100dvh)] h-screen p-0",
        onInteractOutside: (e) => e.preventDefault(),
        children: [
          /* @__PURE__ */ jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsx(DialogTitle, {}),
            /* @__PURE__ */ jsx(DialogDescription, {})
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center w-full h-screen", children: /* @__PURE__ */ jsx(
            WebcamComponent,
            {
              onScan: (data) => {
                onScan(data);
                setOpen(false);
              }
            }
          ) }),
          /* @__PURE__ */ jsx(DialogFooter, { className: "sm:justify-start" })
        ]
      }
    )
  ] });
}
const WebcamComponent = ({
  onScan
}) => {
  const videoRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const [devices, setDevices] = useState([]);
  const [captured, setCaptured] = useState(false);
  useEffect(() => {
    const startWebcam = async (deviceId2 = void 0) => {
      setLoading(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: deviceId2 ? { exact: deviceId2 } : void 0,
            facingMode: deviceId2 ? void 0 : { ideal: "environment" },
            width: { ideal: 540 },
            height: { ideal: 960 }
            // aspectRatio: { ideal: 16 / 9 },
          }
        });
        const availableDevices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = availableDevices.filter(
          (device) => device.kind === "videoinput"
        );
        setDevices(videoDevices);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        setError(
          "Unable to access the webcam. Please check your device settings."
        );
        console.error(err);
      }
      setLoading(false);
    };
    startWebcam(deviceId);
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [deviceId]);
  const captureImage = async () => {
    const tk = localStorage.getItem("accessToken");
    if (!tk) {
      toast.error("You are not logged in");
      return;
    }
    const video = videoRef.current;
    toast.success("Captured! Processing...");
    setCaptured(true);
    if (video) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataURL = canvas.toDataURL("image/png");
        const blob = await (await fetch(imageDataURL)).blob();
        const formData = new FormData();
        formData.append("image", blob, "webcam-capture.png");
        try {
          const apiResponse = await fetch(window.ENV.API_URL + "/api/v1/img", {
            method: "POST",
            body: blob,
            headers: {
              "Content-Type": "application/octet-stream",
              "Authorization": `Bearer ${tk}`
            }
          });
          if (!apiResponse.ok) {
            toast.error("Failed to upload image");
            setCaptured(false);
            throw new Error("Failed to upload image");
          }
          console.log("Image uploaded successfully");
          const data = await apiResponse.json();
          console.log(data);
          if (!data.receipt) {
            toast.error("No receipt found in image. Please try again.");
            setCaptured(false);
            return;
          }
          onScan(data);
        } catch (uploadError) {
          setCaptured(false);
          console.error("Error uploading image:", uploadError);
          toast.error("Error uploading image");
        }
      }
    }
  };
  const handleDeviceChange = (event) => {
    setDeviceId(event.target.value);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    loading && /* @__PURE__ */ jsx("p", { className: "text-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center", children: "Loading..." }),
    devices.length > 1 && /* @__PURE__ */ jsx("div", { className: "device-selector mt-2", children: /* @__PURE__ */ jsx("select", { id: "device", className: "bg-neutral-100 p-1 ml-1 cursor-pointer absolute top-8 z-[999] left-1/2 -translate-x-1/2 w-1/2", onChange: handleDeviceChange, value: deviceId || "", children: devices.map((device) => /* @__PURE__ */ jsx("option", { value: device.deviceId, children: device.label || `Camera ${device.deviceId}` }, device.deviceId)) }) }),
    /* @__PURE__ */ jsx(
      "video",
      {
        ref: videoRef,
        style: { width: "100svw" },
        autoPlay: true,
        muted: true,
        playsInline: true,
        onClick: captureImage,
        className: "hover:opacity-90 cursor-pointer transition-opacity absolute top-0 left-0"
      }
    ),
    /* @__PURE__ */ jsx("button", { className: "bg-green-100 p-2 rounded-lg mt-4 hover:bg-green-200 transition-colors absolute bottom-8 left-1/2 -translate-x-1/2", onClick: captureImage, disabled: captured, children: "Capture" }),
    error && /* @__PURE__ */ jsx("p", { children: error }),
    imageSrc && /* @__PURE__ */ jsxs("div", { className: "image-preview", children: [
      /* @__PURE__ */ jsx("h3", { children: "Captured Image:" }),
      /* @__PURE__ */ jsx("img", { src: imageSrc, alt: "Captured" })
    ] })
  ] });
};
function Footer({ onScan }) {
  const location = useLocation();
  const currentPath = location.pathname;
  return /* @__PURE__ */ jsx("footer", { className: "sticky bottom-0 bg-white border-t border-gray-200 z-50", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-around items-end px-4 py-4", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex flex-col items-center hover:opacity-60 transition-opacity", children: [
      /* @__PURE__ */ jsx(
        Home,
        {
          className: `h-6 w-6 ${currentPath === "/" ? "text-green-600" : "text-gray-500"}`
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-xs mt-1 text-gray-500 sr-only", children: "Home" })
    ] }),
    /* @__PURE__ */ jsxs(Link, { to: "/social", className: "flex flex-col items-center hover:opacity-60 transition-opacity", children: [
      /* @__PURE__ */ jsx(
        Users,
        {
          className: `h-6 w-6 ${currentPath === "/social" ? "text-green-600" : "text-gray-500"}`
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-xs mt-1 text-gray-500 sr-only", children: "Social" })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "w-16" }),
    /* @__PURE__ */ jsxs(Link, { to: "/history", className: "flex flex-col items-center hover:opacity-60 transition-opacity", children: [
      /* @__PURE__ */ jsx(
        Wallet,
        {
          className: `h-6 w-6 ${currentPath === "/history" ? "text-green-600" : "text-gray-500"}`
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-xs mt-1 text-gray-500 sr-only", children: "History" })
    ] }),
    /* @__PURE__ */ jsxs(Link, { to: "/profile", className: "flex flex-col items-center hover:opacity-60 transition-opacity", children: [
      /* @__PURE__ */ jsx(
        CircleUserRound,
        {
          className: `h-6 w-6 ${currentPath === "/profile" ? "text-green-600" : "text-gray-500"}`
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-xs mt-1 text-gray-500 sr-only", children: "Profile" })
    ] }),
    /* @__PURE__ */ jsx(ScanDialog, { onScan })
  ] }) });
}
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
function Result({ receiptData, onClose, className }) {
  const [animate, setAnimate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-200 p-4 text-green-800 ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `w-full max-w-md transform ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"} transition-all duration-500 ease-out`, children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative inline-block", children: [
          /* @__PURE__ */ jsx(Leaf, { className: "w-24 h-24 mx-auto mb-4 text-green-500" }),
          /* @__PURE__ */ jsx(Receipt, { className: "w-12 h-12 absolute bottom-0 right-0 text-green-600" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-2", children: "Eco-tastic!" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl mb-4", children: "You've earned" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-6 h-6 mr-2 text-green-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-5xl font-bold text-green-600", children: receiptData.points.toLocaleString() }),
          /* @__PURE__ */ jsx(Sparkles, { className: "w-6 h-6 ml-2 text-green-500" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl mt-2", children: "green points!" })
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          className: "w-full bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 mb-4",
          onClick: () => {
            onClose();
          },
          children: [
            "Go back to main menu",
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 ml-2" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-auto", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "w-full px-4 py-3 flex justify-between items-center bg-green-50 text-green-800 hover:bg-green-100 transition-colors duration-200",
            onClick: () => setShowDetails(!showDetails),
            children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "More Details" }),
              showDetails ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5" })
            ]
          }
        ),
        showDetails && /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5 mr-2 text-green-600" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: receiptData.storeName })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 mr-2 text-green-600" }),
            /* @__PURE__ */ jsx("span", { children: receiptData.date })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Leaf, { className: "w-5 h-5 mr-2 text-green-600" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Carbon Footprint: ",
              receiptData.co2,
              " kg CO2"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold mb-1", children: "Items Purchased:" }),
            /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside pl-2", children: receiptData.items.map((item, index) => /* @__PURE__ */ jsxs("li", { children: [
              item.name,
              " - $",
              item.price.toFixed(2)
            ] }, index)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "font-semibold", children: [
            "Total Cost: $",
            receiptData.totalCost.toFixed(2)
          ] }),
          receiptData.generic && receiptData.sponsoredProducts && receiptData.sponsoredCost && receiptData.sponsoredProducts.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold mb-1", children: "Eco-Partner Products:" }),
            /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside pl-2", children: receiptData.sponsoredProducts.map((product, index) => /* @__PURE__ */ jsxs("li", { children: [
              product.name,
              " - $",
              product.price.toFixed(2)
            ] }, index)) }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 font-semibold", children: [
              "Eco-Partner Total: $",
              receiptData.sponsoredCost.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "font-semibold text-green-600", children: [
            "Points Earned: ",
            receiptData.points
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden", children: [...Array(20)].map((_, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute rounded-full bg-green-400 opacity-20",
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          animation: `float ${Math.random() * 3 + 2}s linear infinite`
        }
      },
      i
    )) })
  ] });
}
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
async function loader$1() {
  return json({
    ENV: {
      API_URL: process.env.API_URL
    }
  });
}
function Layout({ children }) {
  const data = useLoaderData();
  const [receiptData, setReceiptData] = useState(null);
  const setBal = useBalanceStore((state) => state.setBal);
  const setMemberId = useBalanceStore((state) => state.setMemberId);
  const location = useLocation();
  useEffect(() => {
    const tk = localStorage.getItem("accessToken");
    if (tk) {
      const decoded = jwtDecode(tk);
      setMemberId(decoded.id);
      console.log("DECODING");
      fetch(window.ENV.API_URL + `/api/v1/loyalty/${decoded.id}/points`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + tk
        }
      }).then((res) => res.json()).then((res) => {
        setBal(res.balance);
      });
    }
  }, [receiptData]);
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "flex h-screen items-center justify-center relative", children: [
      /* @__PURE__ */ jsx(Toaster, { position: "top-right", richColors: true, className: "z-[9999]" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:hidden w-full h-full", children: [
        /* @__PURE__ */ jsx(Header, {}),
        receiptData ? /* @__PURE__ */ jsx(Result, { className: "min-h-full flex-1 overflow-auto", receiptData, onClose: () => setReceiptData(null) }) : /* @__PURE__ */ jsx("div", { className: cn("flex-1 overflow-auto py-4", {
          "px-8": location.pathname !== "/history"
        }), children }),
        /* @__PURE__ */ jsx(Footer, { onScan: (receiptData2) => setReceiptData(receiptData2) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex flex-col text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text", children: "EcoRewards" }),
        "This site is designed for mobile devices only. Please visit from a mobile device to view this content."
      ] }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `window.ENV = ${JSON.stringify(
              data.ENV
            )}`
          }
        }
      ),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
async function loader() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImFkbWluQGFkbWluLmRldiIsImlhdCI6MTcyNjMyODMxMiwiZXhwIjoxNzI2MzMwMTEyfQ.viPsrBWdApFsMWhWgrccpt39Hf9MJu5uCI9hkkHVnl8";
  const res = await fetch(
    "http://localhost:3000/api/v1/loyalty/partners/1",
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
  return json$1(await res.json());
}
function Partners() {
  const partners = useLoaderData();
  return /* @__PURE__ */ jsxs("ul", { children: [
    "asdfjasdflkasd",
    JSON.stringify(partners)
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Partners,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
function Component$1() {
  const navigate = useNavigate();
  const memberId = useBalanceStore((state) => state.memberId);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const tk = localStorage.getItem("accessToken");
      if (!tk) {
        navigate("/login");
        return;
      }
      const data = await fetch(window.ENV.API_URL + `/api/v1/loyalty/${memberId}/transactions`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${tk}`
        }
      });
      const tran = await data.json();
      console.log("fetched transactions", tran.transactions);
      setTransactions(tran.transactions);
    };
    fetchData();
  }, []);
  const [sortOrder, setSortOrder] = useState("desc");
  const sortedTransactions = [...transactions].sort((a, b) => {
    return sortOrder === "desc" ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };
  return /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-bold", children: "Transactions History" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { className: "w-[180px]", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", onClick: toggleSortOrder, className: "font-bold", children: [
          "Date",
          sortOrder === "desc" ? /* @__PURE__ */ jsx(ChevronDown, { className: "ml-2 h-4 w-4" }) : /* @__PURE__ */ jsx(ChevronUp, { className: "ml-2 h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ jsx(TableHead, { children: "Description" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Points" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: sortedTransactions.map((transaction) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: new Date(transaction.createdAt).toLocaleDateString() }),
        /* @__PURE__ */ jsx(TableCell, { children: transaction.description }),
        /* @__PURE__ */ jsxs(TableCell, { className: `text-right ${transaction.rewardId === 10 || transaction.rewardId === 11 ? "text-green-600" : "text-red-600"}`, children: [
          transaction.rewardId === 10 || transaction.rewardId === 11 ? "+" : "-",
          Math.abs(transaction.amount).toLocaleString()
        ] })
      ] }, transaction.id)) })
    ] }) })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$1
}, Symbol.toStringTag, { value: "Module" }));
function Streak({ streakDays: streakDays2 }) {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center bg-white rounded-lg p-6 mb-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-green-500 rounded-full w-24 h-24 flex items-center justify-center", children: /* @__PURE__ */ jsx(Leaf, { className: "text-white w-16 h-16" }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-black text-5xl font-black", children: streakDays2 }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-2 mb-4", children: daysOfWeek.map((day, index) => /* @__PURE__ */ jsx("div", { className: "bg-green-200 rounded-full w-8 h-8 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-green-800 text-xs font-semibold", children: day }) }, index)) }),
    /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-green-800 mb-2", children: [
      streakDays2,
      " Day Streak!"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-green-600 text-center", children: streakDays2 === 0 ? "We haven't seen any recent activity. Time to pick up the pace!" : "You're making a positive impact on the environment. Keep it up!" })
  ] });
}
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
function PointsDisplay({ points }) {
  return /* @__PURE__ */ jsxs(Card, { className: "mb-6", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg font-medium flex items-center", children: [
      /* @__PURE__ */ jsx(Leaf, { className: "mr-2 h-5 w-5 text-green-500" }),
      "Eco Points"
    ] }) }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-green-600", children: points }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Keep up the good work!" })
    ] })
  ] });
}
const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;
const ecoAchievementNames = [
  "Carbon Saver",
  "Green Warrior",
  "Sustainability Hero",
  "Eco Champion",
  "Planet Protector",
  "Renewable Advocate",
  "Climate Crusader",
  "Waste Reducer",
  "Nature Guardian",
  "Energy Conservator"
];
const generateMilestones = (points) => {
  const milestones = [];
  const baseMilestone = 0;
  for (let i = 0; i < 5; i++) {
    const milestonePoints = baseMilestone + (i + 1) * 1e3;
    const name = ecoAchievementNames[i % ecoAchievementNames.length];
    milestones.push({
      name,
      neededPoints: milestonePoints,
      completed: points >= milestonePoints,
      points: milestonePoints
    });
  }
  return milestones;
};
function MilestonesList({ points }) {
  const milestones = generateMilestones(points);
  return /* @__PURE__ */ jsxs(Card, { className: "mb-6", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg font-medium flex items-center", children: [
      /* @__PURE__ */ jsx(Award, { className: "mr-2 h-5 w-5 text-yellow-500" }),
      "Milestones"
    ] }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: milestones == null ? void 0 : milestones.map((milestone, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: `font-medium ${milestone.completed ? "text-green-600" : ""}`, children: milestone == null ? void 0 : milestone.name }),
        /* @__PURE__ */ jsx(Progress, { value: Math.floor(points / milestone.neededPoints * 100), className: "h-2 mt-1" })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: `ml-2 text-sm ${milestone.completed ? "text-green-600" : "text-muted-foreground"}`, children: [
        (milestone == null ? void 0 : milestone.neededPoints) || 0,
        " pts"
      ] })
    ] }, index)) }) })
  ] });
}
const avatar = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='12'%20cy='6'%20r='4'%20stroke='%231C274C'%20stroke-width='1.5'/%3e%3cpath%20d='M19.9975%2018C20%2017.8358%2020%2017.669%2020%2017.5C20%2015.0147%2016.4183%2013%2012%2013C7.58172%2013%204%2015.0147%204%2017.5C4%2019.9853%204%2022%2012%2022C14.231%2022%2015.8398%2021.8433%2017%2021.5634'%20stroke='%231C274C'%20stroke-width='1.5'%20stroke-linecap='round'/%3e%3c/svg%3e";
const meta$1 = () => {
  return [
    { title: "EcoRewards - Profile" },
    { name: "description", content: "Profile Page" }
  ];
};
function Profile(props) {
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const tk = localStorage.getItem("accessToken");
      if (!tk) {
        navigate("/login");
        return;
      }
      const decoded = jwtDecode(tk);
      setProfileData(decoded);
      console.log(decoded);
    };
    fetchData();
  }, []);
  const balance = useBalanceStore((state) => state.balance);
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center pb-4", children: [
      /* @__PURE__ */ jsxs(Avatar, { className: "h-20 w-20", children: [
        /* @__PURE__ */ jsx("img", { src: avatar, alt: "User's avatar" }),
        /* @__PURE__ */ jsx(AvatarFallback, { children: "AV" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pl-4", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: (profileData == null ? void 0 : profileData.name) ? /* @__PURE__ */ jsx(Fragment, { children: profileData == null ? void 0 : profileData.name }) : "Your Name" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: balance < 1e3 ? "Eco Beginner" : balance > 1e3 && balance < 5e3 ? "Eco Warrior" : "Eco Master" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsx(Streak, { streakDays: 2 }),
      /* @__PURE__ */ jsx(PointsDisplay, { points: balance }),
      /* @__PURE__ */ jsx(MilestonesList, { points: balance })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex w-full", children: /* @__PURE__ */ jsx("button", { className: "m-8 mt-0 bg-red-100 p-2 rounded-md w-full hover:bg-red-200 transition-colors", onClick: () => {
      localStorage.removeItem("accessToken");
      navigate("/login");
      toast.success("Logged out successfully!");
    }, children: "Log Out" }) })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Profile,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function getAnimalEmoji(animal) {
  const emojiMap = {
    Turtle: "🐢",
    Squirrel: "🐿️",
    Bird: "🐦",
    Wolf: "🐺",
    Eagle: "🦅"
  };
  return emojiMap[animal] || "❓";
}
const animalEmoji = getAnimalEmoji("Turtle");
console.log(animalEmoji);
function Component() {
  const navigate = useNavigate();
  const [lb, setLb] = useState([]);
  const fetched = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      const tk = localStorage.getItem("accessToken");
      if (!tk) {
        navigate("/login");
        return;
      }
      const res = await fetch(window.ENV.API_URL + "/api/v1/loyalty/leaderboard");
      setLb(await res.json());
    };
    if (fetched && !fetched.current) {
      fetched.current = true;
      fetchData();
    }
  }, []);
  const sortedUsers = useMemo(() => [...lb].sort((a, b) => b.points - a.points), [lb]);
  return /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md mx-auto", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-bold text-center", children: "Global Point Leaderboard" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { className: "w-[50px] text-center", children: "Rank" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Name" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Points" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: sortedUsers.map((user, index) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "text-center font-medium", children: index < 3 ? /* @__PURE__ */ jsx(Trophy, { className: `inline-block w-5 h-5 ${index === 0 ? "text-yellow-400" : index === 1 ? "text-gray-400" : "text-yellow-700"}` }) : index + 1 }),
        /* @__PURE__ */ jsxs(TableCell, { children: [
          user.name,
          " ",
          getAnimalEmoji(user.animal)
        ] }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: user.balance })
      ] }, user.name)) })
    ] }) })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component
}, Symbol.toStringTag, { value: "Module" }));
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:bg-neutral-100 focus:border-neutral-300 transition-all disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const TreesImage = "/assets/trees-DVZJVNjm.webp";
const meta = () => {
  return [
    { title: "EcoRewards" },
    { name: "description", content: "Earn rewards by eco-friendly actions" }
  ];
};
function Index() {
  var _a;
  const [searchParams] = useSearchParams();
  const query = ((_a = searchParams.get("query")) == null ? void 0 : _a.toLowerCase()) || "";
  const [rewards, setRewards] = useState([]);
  const balance = useBalanceStore((state) => state.balance);
  const setBal = useBalanceStore((state) => state.setBal);
  const memberId = useBalanceStore((state) => state.memberId);
  const [spendActive, setSpendActive] = useState(false);
  useEffect(() => {
    fetch(window.ENV.API_URL + "/api/v1/rewards/getAll").then((res) => res.json()).then((res) => {
      setRewards(res.rewards);
      console.log(res);
    });
  }, []);
  const [animationParent] = useAutoAnimate();
  console.log(rewards);
  const filteredRewards = rewards.filter(
    (reward) => (reward.name.toLowerCase().includes(query) || reward.category.toLowerCase().includes(query)) && !(reward.id === 10 || reward.id === 11)
  );
  const categorizedRewards = filteredRewards.reduce((acc, reward) => {
    if (!acc[reward.category]) {
      acc[reward.category] = [];
    }
    acc[reward.category].push(reward);
    return acc;
  }, {});
  const spendPoints = async (reward) => {
    if (spendActive) {
      toast.error("Still processing last transaction!");
      return;
    }
    setSpendActive(true);
    if (balance < reward.points) {
      toast.error("You don't have enough ecopoints!");
      setSpendActive(false);
      return;
    }
    const tk = localStorage.getItem("accessToken");
    if (!tk) {
      toast.error("Cannot find access token, please sign in again");
      setSpendActive(false);
      return;
    }
    if (!memberId) {
      toast.error("Unknown member id error");
      setSpendActive(false);
      return;
    }
    console.log("member id", memberId);
    const res = await fetch(window.ENV.API_URL + `/api/v1/loyalty/${memberId}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tk}`
      },
      body: JSON.stringify({
        category: reward.category,
        description: `Purchase ${reward.name}`,
        points: 5e3,
        // amount: 5000,
        rewardId: reward.id,
        amount: reward.points
      })
    });
    console.log("transaction", res);
    toast.success(`Bought ${reward.name} successfully`);
    setBal(balance - reward.points);
    setSpendActive(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx(SearchBar, { className: "relative w-full" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full mt-4 h-screen", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "rounded-lg w-full p-8",
          style: {
            backgroundImage: `url(${TreesImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          },
          children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-white", children: "Carbon Offsets" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm mt-3", children: "Offset your carbon footprint by redeeming your points to support projects that reduce greenhouse gas emissions like tree planting." }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "bg-green-600 text-white px-4 py-2 rounded-lg mt-4 hover:opacity-90 transition-opacity",
                onClick: () => {
                  var _a2;
                  (_a2 = document.getElementById("rewards")) == null ? void 0 : _a2.scrollIntoView();
                },
                children: "Learn More →"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex flex-col w-full mt-4",
          id: "rewards",
          ref: animationParent,
          children: [
            Object.entries(categorizedRewards).map(
              ([category, rewards2]) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full mt-4", children: [
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: category }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4", children: rewards2.map(
                  (reward) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "rounded-lg bg-white shadow-md p-4",
                      children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: reward.image,
                            alt: String(reward.name),
                            className: "w-full h-40 object-cover rounded-lg"
                          }
                        ),
                        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-2", children: reward.name }),
                        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-1", children: reward.description }),
                        /* @__PURE__ */ jsxs(
                          "button",
                          {
                            className: "bg-green-600 text-white px-4 py-2 rounded-lg mt-4",
                            onClick: () => spendPoints(reward),
                            children: [
                              reward.points.toLocaleString(),
                              " Points"
                            ]
                          }
                        )
                      ]
                    },
                    reward.id
                  )
                ) })
              ] }, category)
            ),
            JSON.stringify(categorizedRewards) === "{}" && /* @__PURE__ */ jsx("p", { className: "text-center text-xl mt-4", children: "No rewards found" })
          ]
        }
      )
    ] })
  ] });
}
function SearchBar(props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(query === "");
    if (query.trim() === "" || query === null || query === void 0 || query === " " || query === "") {
      navigate("/");
      return;
    }
    navigate(`/?query=${query}`);
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: "relative top-0 w-full",
      onSubmit: handleFormSubmit,
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            className: "w-full [outline:none!important]",
            placeholder: "What are you looking for?",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            name: "search",
            autoComplete: "off"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "absolute right-4 top-1/2 -translate-y-1/2",
            children: /* @__PURE__ */ jsx(Search, { className: "text-gray-600 h-4 w-4 fill-current" })
          }
        )
      ]
    }
  );
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function Claim() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const navigate = useNavigate();
  const setBal = useBalanceStore((state) => state.setBal);
  const claimed = useRef(false);
  useEffect(() => {
    if (claimed && !claimed.current) {
      claimed.current = true;
      const tk = localStorage.getItem("accessToken");
      if (tk) {
        const decoded = jwtDecode(tk);
        fetch(window.ENV.API_URL + `/api/v1/loyalty/${decoded.id}/transit`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tk
          }
        }).then((res) => res.json()).then((res) => {
          console.log(res.balance);
          setBal(res.balance);
        });
      }
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 5e3);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);
  const handleNavigateHome = () => {
    navigate("/");
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-full bg-green-50 flex items-center justify-center p-4", children: [
    isAnimating && /* @__PURE__ */ jsx(
      Confetti,
      {
        width: windowSize.width,
        height: windowSize.height,
        recycle: false,
        numberOfPieces: 200
      }
    ),
    /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md bg-white shadow-lg", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { scale: 0 },
            animate: { scale: 1 },
            transition: { type: "spring", stiffness: 260, damping: 20 },
            className: "text-3xl font-bold text-green-600 text-center",
            children: "Congratulations!"
          }
        ) }),
        /* @__PURE__ */ jsx(CardDescription, { className: "text-center text-gray-600", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { scale: 0 },
            animate: { scale: 1 },
            transition: { type: "spring", stiffness: 260, damping: 60 },
            children: "You've received Eco Points for using public transport!"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.3 },
          className: "text-center",
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold text-green-500 mb-2", children: "1000" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-700", children: "Points Added" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(CardFooter, { className: "flex justify-center", children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          className: "bg-green-500 text-white hover:bg-green-600",
          onClick: handleNavigateHome,
          children: "Back to Home"
        }
      ) })
    ] })
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Claim
}, Symbol.toStringTag, { value: "Module" }));
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animal, setAnimal] = useState(1);
  const setBal = useBalanceStore((state) => state.setBal);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("accessToken")) {
        navigate("/profile");
      }
    };
    fetchData();
  }, []);
  const logIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(window.ENV.API_URL + "/api/v1/user-login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      const token = (await response.json()).token;
      localStorage.setItem("accessToken", token);
      const decoded = jwtDecode(token);
      console.log("decoded", decoded);
      setBal(decoded.balance);
      toast.success("Logged in successfully!");
      navigate("/");
    } else {
      toast.error("An error occurred.");
    }
    setIsLoading(false);
  };
  const signUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(window.ENV.API_URL + "/api/v1/user-signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        animal: ["Turtle", "Bird", "Squirrel"][animal - 1]
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      const token = (await response.json()).token;
      localStorage.setItem("accessToken", token);
      const decoded = jwtDecode(token);
      console.log("decoded", decoded);
      setBal(decoded.balance);
      toast.success("Account created successfully!");
      navigate("/");
    } else {
      toast.error("An error occurred. This email may already be in use.");
    }
    setIsLoading(false);
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full h-full flex justify-center items-start mt-16", children: /* @__PURE__ */ jsxs(Card, { className: "w-[350px]", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Authentication" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Log in or sign up to your account." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "login", className: "w-full", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "login", children: "Login" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "signup", children: "Sign Up" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "login", children: /* @__PURE__ */ jsxs("form", { onSubmit: logIn, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid w-full items-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "login-email", children: "Email" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "login-email",
                placeholder: "Enter your email",
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "login-password", children: "Password" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "login-password",
                placeholder: "Enter your password",
                type: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "w-full mt-4 bg-green-600",
            type: "submit",
            disabled: isLoading,
            children: isLoading ? "Logging in..." : "Log in"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "signup", children: /* @__PURE__ */ jsxs("form", { onSubmit: signUp, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid w-full items-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "signup-name", children: "Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "signup-name",
                placeholder: "Enter your name",
                value: name,
                onChange: (e) => setName(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "signup-email", children: "Email" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "signup-email",
                placeholder: "Enter your email",
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "signup-password", children: "Password" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "signup-password",
                placeholder: "Choose a password",
                type: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "signup-animal", children: "Favorite Animal" }),
            /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: "border p-2 rounded relative", children: [
                animal === 1 ? "Turtle" : animal === 2 ? "Bird" : "Squirrel",
                /* @__PURE__ */ jsx(ArrowDown, { className: "absolute right-2 top-1/4" })
              ] }),
              /* @__PURE__ */ jsxs(DropdownMenuContent, { children: [
                /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setAnimal(1), children: "Turtle" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setAnimal(2), children: "Bird" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setAnimal(3), children: "Squirrel" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "w-full mt-4 bg-green-600",
            type: "submit",
            disabled: isLoading,
            children: isLoading ? "Signing up..." : "Sign up"
          }
        )
      ] }) })
    ] }) })
  ] }) });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AuthForm
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DpNX9wii.js", "imports": ["/assets/index-b9mOX-ty.js", "/assets/index-DaFgVfeA.js", "/assets/index-Cw6jCe4l.js", "/assets/components-i7ntA2Le.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CKb-Sfbo.js", "imports": ["/assets/index-b9mOX-ty.js", "/assets/index-DaFgVfeA.js", "/assets/index-Cw6jCe4l.js", "/assets/components-i7ntA2Le.js", "/assets/store-DN2nkw-m.js", "/assets/index-_t69l_HP.js", "/assets/index-DVjGZTE2.js", "/assets/index-BWEasW5l.js", "/assets/utils-DnNDQBbQ.js", "/assets/createLucideIcon-CP5-0Dwr.js", "/assets/index-BJkUeisO.js", "/assets/button-BjFBEIeJ.js", "/assets/leaf-B4xoEMwR.js", "/assets/chevron-up-Br7yyuhK.js", "/assets/index-VWaDGczM.js"], "css": ["/assets/root-BImIylCl.css"] }, "routes/partners": { "id": "routes/partners", "parentId": "root", "path": "partners", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/partners-BIbAnVRs.js", "imports": ["/assets/index-b9mOX-ty.js", "/assets/components-i7ntA2Le.js", "/assets/index-Cw6jCe4l.js", "/assets/index-DaFgVfeA.js"], "css": [] }, "routes/history": { "id": "routes/history", "parentId": "root", "path": "history", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/history-TP-F3XVm.js", "imports": ["/assets/index-b9mOX-ty.js", "/assets/card-QBdUXyHB.js", "/assets/table-Dj3FhNY7.js", "/assets/button-BjFBEIeJ.js", "/assets/store-DN2nkw-m.js", "/assets/chevron-up-Br7yyuhK.js", "/assets/utils-DnNDQBbQ.js", "/assets/index-DVjGZTE2.js", "/assets/createLucideIcon-CP5-0Dwr.js"], "css": [] }, "routes/profile": { "id": "routes/profile", "parentId": "root", "path": "profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/profile-CXNbP7w3.js", "imports": ["/assets/index-b9mOX-ty.js", "/assets/leaf-B4xoEMwR.js", "/assets/index-BWEasW5l.js", "/assets/utils-DnNDQBbQ.js", "/assets/card-QBdUXyHB.js", "/assets/createLucideIcon-CP5-0Dwr.js", "/assets/index-BJkUeisO.js", "/assets/index-VWaDGczM.js", "/assets/store-DN2nkw-m.js", "/assets/index-DaFgVfeA.js", "/assets/index-DVjGZTE2.js"], "css": [] }, "routes/social": { "id": "routes/social", "parentId": "root", "path": "social", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/social-DG6IAhAX.js", "imports": ["/assets/index-b9mOX-ty.js", "/assets/table-Dj3FhNY7.js", "/assets/card-QBdUXyHB.js", "/assets/createLucideIcon-CP5-0Dwr.js", "/assets/utils-DnNDQBbQ.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-9xl3ht10.js", "imports": ["/assets/index-b9mOX-ty.js", "/assets/input-BmNbZnrl.js", "/assets/store-DN2nkw-m.js", "/assets/index-BJkUeisO.js", "/assets/index-Cw6jCe4l.js", "/assets/createLucideIcon-CP5-0Dwr.js", "/assets/utils-DnNDQBbQ.js", "/assets/index-DaFgVfeA.js"], "css": [] }, "routes/claim": { "id": "routes/claim", "parentId": "root", "path": "claim", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/claim-BUj97WHv.js", "imports": ["/assets/index-b9mOX-ty.js", "/assets/button-BjFBEIeJ.js", "/assets/card-QBdUXyHB.js", "/assets/index-VWaDGczM.js", "/assets/store-DN2nkw-m.js", "/assets/index-DVjGZTE2.js", "/assets/utils-DnNDQBbQ.js"], "css": [] }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/login-XuE-e0-D.js", "imports": ["/assets/index-b9mOX-ty.js", "/assets/button-BjFBEIeJ.js", "/assets/card-QBdUXyHB.js", "/assets/input-BmNbZnrl.js", "/assets/index-BWEasW5l.js", "/assets/utils-DnNDQBbQ.js", "/assets/index-_t69l_HP.js", "/assets/index-DVjGZTE2.js", "/assets/index-DaFgVfeA.js", "/assets/createLucideIcon-CP5-0Dwr.js", "/assets/index-BJkUeisO.js", "/assets/index-VWaDGczM.js", "/assets/store-DN2nkw-m.js"], "css": [] } }, "url": "/assets/manifest-e1ba1c06.js", "version": "e1ba1c06" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/partners": {
    id: "routes/partners",
    parentId: "root",
    path: "partners",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/history": {
    id: "routes/history",
    parentId: "root",
    path: "history",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "root",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/social": {
    id: "routes/social",
    parentId: "root",
    path: "social",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route5
  },
  "routes/claim": {
    id: "routes/claim",
    parentId: "root",
    path: "claim",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
