# Digit-Recognition-using-MNIST-Dataset

# Handwritten Digit Recognition with MNIST

This repository implements a handwritten digit recognition system using the MNIST dataset. It includes a Flask-based web application for drawing digits and a trained PyTorch model for making predictions.

## Overview

The project consists of the following main components:

* **`train.ipynb`**:  A Jupyter Notebook that contains the code for training the neural network on the MNIST dataset.
* **`utils.py`**:  A Python script containing utility functions for loading the trained model, transforming input images, and making predictions.
* **`app.py`**:  A Flask application that provides a user interface for drawing digits and displaying the model's predictions.
* **`Model.pth`**:  The saved weights of the trained PyTorch model.

## Files Description

* **`app.py`**:  This file sets up a Flask web application.
    * It defines routes for the home page (`/`), which renders a drawing interface (`draw.html` - *Note: this file is not provided in the submitted files*), and a prediction endpoint (`/predict`).
    * The `/predict` endpoint handles receiving an image file from the user, preprocessing it using the functions in `utils.py`, and returning the model's prediction.
* **`train.ipynb`**:  This Jupyter Notebook performs the following:
    * Imports necessary PyTorch libraries for building and training the neural network.
    * Loads the MNIST dataset using `torchvision.datasets.MNIST`.
    * Defines a simple neural network architecture (`NeuoralNet`) with one hidden layer.
    * Sets up the training loop, including the optimizer (Adam), loss function (CrossEntropyLoss), and number of epochs.
    * Trains the model and evaluates its performance on the test set.
    * Saves the trained model's state dictionary to `Model.pth`.
* **`utils.py`**:  This file provides utility functions for the Flask application:
    * Defines the same neural network architecture (`NeuoralNet`) as in `train.ipynb`.
    * Loads the trained model weights from `Model.pth`.
    * `transform_image()`:  This function takes image bytes as input, preprocesses the image (grayscales, resizes, converts to tensor, and normalizes), and adds a batch dimension.
    * `get_prediction()`:  This function takes the preprocessed image tensor, feeds it to the model, and returns the predicted digit.

## Setup and Usage

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/AkshithSai-24/Digit-Recognition-using-MNIST-Dataset.git
    cd Digit-Recognition-using-MNIST-Dataset
    ```

2.  **Install Dependencies:**

    * It is recommended to create a virtual environment.
    * Install the required Python packages.  While a `requirements.txt` is not provided, you'll need at least:

        ```bash
        pip install torch torchvision Flask 
        ```

3.  **Run the Flask Application:**

    ```bash
    python app.py
    ```

    * This will start the Flask development server. Open your web browser and go to the address displayed (usually `http://127.0.0.1:5000/`) to use the digit drawing interface.

## Training the Model (Optional)

* If you wish to retrain the model or modify the architecture, you can run the `train.ipynb` notebook.
* Ensure you have Jupyter Notebook installed (`pip install notebook`).
* Run the notebook cell by cell.  This will download the MNIST dataset, train the model, and save the weights to `Model.pth`.

## Notes

* The `draw.html` file, which provides the drawing interface, is not included in the provided files. You will need to create an HTML file that allows users to draw a digit and send it to the Flask server as an image file.
* The model architecture is a simple neural network. You can experiment with more complex architectures like Convolutional Neural Networks (CNNs) for potentially better performance.
* Error handling in `app.py` is basic.  Consider adding more robust error logging and user feedback in a production environment.
