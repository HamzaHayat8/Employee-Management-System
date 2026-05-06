import { Card, CardContent, CardHeader, CardTitle } from "../common/card";
import { Button } from "../common/button";
import { Badge } from "../common/badge";

export function FaceCapture({
  videoRef,
  isCapturing,
  isLoadingModels,
  faceDescriptor,
  onStart,
  onCapture,
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Face verification</CardTitle>
          {faceDescriptor && (
            <Badge className="bg-green-100 text-green-700 border-green-300">
              ✓ Face captured
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {isLoadingModels ? (
          <div className="flex items-center gap-2 text-amber-600">
            <span className="animate-spin text-lg">⏳</span>
            <p>Loading face recognition models…</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col gap-3">
              {/* Video element — srcObject set by hook via ref */}
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-80 rounded-lg border-2 border-gray-300 bg-gray-100"
              />

              <div className="flex gap-2">
                <Button
                  onClick={onStart}
                  variant="outline"
                  disabled={isCapturing}
                  className="flex-1"
                >
                  {isCapturing ? "Camera on" : "Start camera"}
                </Button>

                <Button
                  onClick={onCapture}
                  disabled={!isCapturing}
                  className="flex-1"
                >
                  Capture face
                </Button>
              </div>

              {!isCapturing && (
                <p className="text-xs text-gray-400">
                  Start the camera, position your face in frame, then capture.
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
