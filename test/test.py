import cv2
import numpy as np

model_base_path = 'Model/fastai/'
green_model_path = 'onnx_greenscape3.onnx'
video_cam_index = 0

maskModel = cv2.dnn.readNetFromONNX(model_base_path + green_model_path)
stream = cv2.VideoCapture(video_cam_index)
output = ""
color = [(0, 255, 0), (255, 0, 0), (0, 0, 255), (255, 0, 255)]


def detect(img, mask_model=maskModel):
	# Generate a blob
	blob = cv2.dnn.blobFromImage(img, 1.0 / 255, (128, 128), (0, 0, 0), swapRB=True, crop=False)

	mask_model.setInput(blob)
	preds = mask_model.forward()
	prediction_index = np.array(preds)[0].argmax()
	return prediction_index


def greenscape():
	global maskModel, output
	global stream
	while True:
		# Read frame from the stream
		ret, frame = stream.read()

		# Run the detect function on the frame
		(predictions) = detect(frame, maskModel)

		if predictions == 0:
			output = "Biodegradable Waste"
		elif predictions == 1:
			output = "Dry & Non-biodegradable Waste"
		elif predictions == 2:
			output = "Non-biodegradable Waste"
		elif predictions == 3:
			output = "Nothing"
		else:
			pass

		frame = cv2.putText(frame, output, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, color[predictions], 2, cv2.LINE_AA)

		# show the frame
		cv2.imshow("Frame", frame)
		key = cv2.waitKey(1) & 0xFF

		# break from loop if key pressed is q
		if key == ord("q"):
			break


if __name__ == "__main__":
	greenscape()
