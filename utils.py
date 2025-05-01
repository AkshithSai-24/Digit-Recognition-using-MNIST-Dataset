import io
import torch 
import torch.nn as nn 
import torchvision.transforms as transforms 
from PIL import Image



class NeuoralNet(nn.Module):
    def __init__(self,input,hidden,num_classes):
        super(NeuoralNet,self).__init__()
        self.linear1 = nn.Linear(in_features=input,out_features=hidden)
        self.relu = nn.ReLU()
        self.linear2 = nn.Linear(in_features=hidden,out_features=num_classes)
    def forward(self,x):
        out = self.linear1(x)
        out = self.relu(out)
        out = self.linear2(out)
        return out

input_size = 784 # 28x28
hidden_size = 500 
num_classes = 10
model = NeuoralNet(input_size, hidden_size, num_classes)

PATH = "./Model.pth"
model.load_state_dict(torch.load(PATH))
model.eval()

# image -> tensor
def transform_image(image_bytes):
    transform = transforms.Compose([transforms.Grayscale(num_output_channels=1),
                                    transforms.Resize((28,28)),
                                    transforms.ToTensor(),
                                    transforms.Normalize((0.1307,),(0.3081,))])

    image = Image.open(io.BytesIO(image_bytes))
    return transform(image).unsqueeze(0)

# predict
def get_prediction(image_tensor):
    images = image_tensor.reshape(-1, 28*28)
    outputs = model(images)
        # max returns (value ,index)
    _, predicted = torch.max(outputs.data, 1)
    return predicted