'use client';

import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { Result } from '@zxing/library';
import { FC, HTMLAttributes, SVGProps, useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import adapter from 'webrtc-adapter';
adapter;

export interface QrReaderProps extends HTMLAttributes<HTMLDivElement> {
  videoConstrains?: MediaTrackConstraints;
  scanDelay?: number;
  scanSuccessDelay?: number;
  onReadError?: (err: string) => void;
  onRead?: (result: Result) => void;
  read: boolean;
  flipVideo?: boolean,
}

export const QrReader: FC<QrReaderProps> = ({
  className,
  videoConstrains = { facingMode: 'environment', frameRate: 30 },
  scanDelay = 300,
  scanSuccessDelay = 3500,
  onReadError,
  onRead,
  read,
  flipVideo,
  children,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [controller, setController] = useState<
    IScannerControls | undefined
  >();

  const codeReader = useMemo(() => 
    new BrowserQRCodeReader(undefined, {
      delayBetweenScanAttempts: scanDelay,
      delayBetweenScanSuccess: scanSuccessDelay,
    })
  , [scanDelay, scanSuccessDelay]);

  useEffect(() => {
    if (!videoRef.current || !read || !!controller) {
      return;
    }

    codeReader
      .decodeFromConstraints(
        { video: videoConstrains },
        videoRef.current,
        (result, error) => {
          result && onRead && onRead(result);

          error?.message && onReadError && onReadError(error?.message || '');
        },
      )
      .then(control => {
        setController(control);
      })
      .catch((error: Error) => {
        onReadError && onReadError(error.message);
      });
  }, [
    videoConstrains,
    scanDelay,
    scanSuccessDelay,
    onReadError,
    onRead,
    read,
    controller,
    codeReader
  ]);

  useEffect(() => {
    if (!read) {
      controller?.stop();
      setController(undefined);
    }
  }, [controller, read]);

  return (
    <section
      className={twMerge('relative h-full w-full overflow-hidden', className)}
      {...props}
    >
      <video
        muted
        className="h-full w-full object-cover object-center data-[flip='true']:-scale-x-100"
        data-flip={!!flipVideo}
        ref={videoRef}
      />
      {children}
    </section>
  );
};
QrReader.displayName = 'QrReader';

export const QrReaderViewFinder: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      className={twMerge(
        'absolute left-0 top-0 z-10 h-full w-full border-[3rem] border-black/40',
        className,
      )}
      viewBox="0 0 100 100"
      color='rgb(239 68 68)'
      {...props}
    >
      <path
        fill="none"
        d="M13,0 L0,0 L0,13"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        fill="none"
        d="M0,87 L0,100 L13,100"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        fill="none"
        d="M87,100 L100,100 L100,87"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        fill="none"
        d="M100,13 L100,0 87,0"
        stroke="currentColor"
        strokeWidth="5"
      />
    </svg>
  );
};

QrReaderViewFinder.displayName = "QrReaderViewFinder"