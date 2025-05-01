from flask import Flask,render_template,request,jsonify
from utils import transform_image, get_prediction


app = Flask(__name__)
@app.route("/")
def home():
    return render_template('draw.html')
    



@app.route("/predict",methods=['POST'])
def predict():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'no file part'})
            
        file = request.files['file']
        
       
        if file.filename == '':
            return jsonify({'error': 'no file selected'})
            
        try:
            
            img_bytes = file.read()
            tensor = transform_image(img_bytes)
            prediction = get_prediction(tensor)
            data = {'prediction': prediction.item(), 'class_name': str(prediction.item())}
            return str(data['prediction'])
        except Exception as e:
            return jsonify({'error': f'error during prediction: {str(e)}'})
        


if __name__ == '__main__':
    app.run(debug=True)