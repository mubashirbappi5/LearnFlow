from PIL import Image

def remove_background(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    # Make all white (and near white) pixels transparent
    for item in datas:
        # Check if the pixel is white or almost white
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            # Change to transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

remove_background(
    r"C:\Users\mind_touch\.gemini\antigravity-ide\brain\ffff17f3-6fbe-4c01-b44c-a4b9d14a6ae6\.user_uploaded\media_1790061658520.png",
    r"public\logo.png"
)
