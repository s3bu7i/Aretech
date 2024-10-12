// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "~/components/ui/dialog";

// import React, { useEffect, useRef, useState } from "react";

// import IReceiptData from "~/types/IReceiptData";

// declare global {
//   interface Window {
//     ENV: {
//       API_URL: string;
//     };
//   }
// }
// import { Camera } from "lucide-react";
// import { json } from "@remix-run/react";
// import { toast } from "sonner";

// function ScanDialog({ onScan }: {onScan: (data: IReceiptData) => void}) {
//   const [open, setOpen] = useState(false);
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <button className="absolute left-1/2 -translate-x-1/2 -top-3 p-1 bg-white rounded-full shadow-[0_-3px_3px_-3px_rgba(0,0,0,0.25)]">
//           <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
//             <Camera className="h-6 w-6 text-white" />
//           </div>
//         </button>
//       </DialogTrigger>
//       <DialogContent
//         className="max-h-[calc(100dvh)] h-screen p-0"
//         onInteractOutside={(e) => e.preventDefault()}
//       >
//         <DialogHeader>
//             <DialogTitle></DialogTitle>
//             <DialogDescription></DialogDescription>
//           </DialogHeader>
//         <div className="flex items-center w-full h-screen">
//           <WebcamComponent onScan={(data) => {
//             onScan(data);
//             setOpen(false);
//           }} />
//         </div>
//         <DialogFooter className="sm:justify-start"></DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// const WebcamComponent = ({ onScan }: { onScan: (data: IReceiptData) => void }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [deviceId, setDeviceId] = useState<string | null>(null);
//   const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

//   useEffect(() => {
    
//     const startWebcam = async () => {
//       setLoading(true);
//       try {          
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: {
//             facingMode: {
//                 ideal: "environment"
//             },
//             width: { ideal: 1920 },
//             height: { ideal: 1080 },
//             aspectRatio: { ideal: 16 / 9 },
//             deviceId: 'default',
//           },
//         });

//         const devices = await navigator.mediaDevices.enumerateDevices();
//         console.log(devices);

//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.play();
//         }
//       } catch (err) {
//         setError(
//           "Unable to access the webcam. Please check your device settings."
//         );
//         console.error(err);
//       }
//       setLoading(false);
//     };

//     startWebcam();

//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         const stream = videoRef.current.srcObject as MediaStream;
//         const tracks = stream.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   const captureImage = async () => {
//     const video = videoRef.current;

//     toast.success('Captured! Processing...');
    
//     if (video) {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');

//       if (ctx) {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;

//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         const imageDataURL = canvas.toDataURL('image/png');

//         const blob = await (await fetch(imageDataURL)).blob();

//         const formData = new FormData();
//         formData.append('image', blob, 'webcam-capture.png'); // Adjust filename as needed

//         try {
//           const apiResponse = await fetch(window.ENV.API_URL + '/api/v1/img', {
//             method: 'POST',
//             body: blob,
//             headers: {
//               'Content-Type': 'application/octet-stream',
//             }
//           });

//           if (!apiResponse.ok) {
//             throw new Error('Failed to upload image');
//           }

//           console.log('Image uploaded successfully');

//           const data = await apiResponse.json();
//           console.log(data);

//           if (!data.receipt) {
//             toast.error('No receipt found in image. Please try again.');
//             return;
//           }

//           onScan(data);
//         } catch (uploadError) {
//           console.error('Error uploading image:', uploadError);
//         }
//       }
//     }
//   };

//   return (
//     <div className={`flex flex-col ${!loading && "cursor-pointer"} hover:opacity-90 transition-opacity`}>
//       {loading && <p className="text-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">Loading...</p>}
//       {!loading && <p className="text-black text-center w-full">Click to capture</p>}
      
//       <video
//         ref={videoRef}
//         style={{ width: "100%", height: "100%" }}
//         autoPlay
//         muted
//         playsInline
//         onClick={captureImage}
//       />
//       {error && <p>{error}</p>}
//       {imageSrc && (
//         <div className="image-preview">
//           <h3>Captured Image:</h3>
//           <img src={imageSrc} alt="Captured" />
//         </div>
//       )}
      
//     </div>
//   );
// };

// export default ScanDialog;

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import React, { useEffect, useRef, useState } from "react";

import IReceiptData from "~/types/IReceiptData";

declare global {
  interface Window {
    ENV: {
      API_URL: string;
    };
  }
}
import { Camera } from "lucide-react";
import { json } from "@remix-run/react";
import { toast } from "sonner";

function ScanDialog({ onScan }: { onScan: (data: IReceiptData) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="absolute left-1/2 -translate-x-1/2 -top-3 p-1 bg-white rounded-full shadow-[0_-3px_3px_-3px_rgba(0,0,0,0.25)]">
          <div className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center">
            <Camera className="h-6 w-6 text-white" />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[calc(100dvh)] h-screen p-0"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center w-full h-screen">
          <WebcamComponent
            onScan={(data) => {
              onScan(data);
              setOpen(false);
            }}
          />
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const WebcamComponent = ({
  onScan,
}: {
  onScan: (data: IReceiptData) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [captured, setCaptured] = useState<boolean>(false);

  useEffect(() => {
    const startWebcam = async (deviceId: string | undefined = undefined) => {
      setLoading(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: deviceId ? { exact: deviceId } : undefined,
            facingMode: deviceId ? undefined : { ideal: "environment" },
            width: { ideal: 540 },
            height: { ideal: 960 },
            // aspectRatio: { ideal: 16 / 9 },
          },
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

    startWebcam(deviceId as any);

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
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
        formData.append("image", blob, "webcam-capture.png"); // Adjust filename as needed

        try {
          const apiResponse = await fetch(window.ENV.API_URL + "/api/v1/img", {
            method: "POST",
            body: blob,
            headers: {
              "Content-Type": "application/octet-stream",
              "Authorization": `Bearer ${tk}`,
            },  
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
            setCaptured(false)
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

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDeviceId(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      {loading && (
        <p className="text-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          Loading...
        </p>
      )}
      {devices.length > 1 && (
        <div className="device-selector mt-2">
          {/* <label htmlFor="device">Choose Camer a:</label> */}
          <select id="device" className="bg-neutral-100 p-1 ml-1 cursor-pointer absolute top-8 z-[999] left-1/2 -translate-x-1/2 w-1/2" onChange={handleDeviceChange} value={deviceId || ""}>
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        style={{ width: "100svw" }}
        autoPlay
        muted
        playsInline
        onClick={captureImage}
        className="hover:opacity-90 cursor-pointer transition-opacity absolute top-0 left-0"
      />

      <button className="bg-green-100 p-2 rounded-lg mt-4 hover:bg-green-200 transition-colors absolute bottom-8 left-1/2 -translate-x-1/2" onClick={captureImage} disabled={captured}>Capture</button>

      {/* Device Selector */}

      {error && <p>{error}</p>}
      {imageSrc && (
        <div className="image-preview">
          <h3>Captured Image:</h3>
          <img src={imageSrc} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default ScanDialog;
