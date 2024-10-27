from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pandas as pd
from typing import List, Any, Union
from fastapi.middleware.cors import CORSMiddleware
from data_analyze import write_json, read_json, write_json_filter
from fastapi.responses import HTMLResponse
import os
import json
import pandas as pd
from io import StringIO
from fastapi.responses import StreamingResponse
from PIL import Image
import io
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Измените на нужные вам домены
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if file.filename.endswith('.csv'):
        contents = await file.read()
        data = pd.read_csv(StringIO(contents.decode('utf-8')), header=1, sep=';', encoding='utf-8').fillna('-')[:200]
        df_columns = data.columns.tolist()
        df_values = data.values.tolist()
        write_json(columns=df_columns, values=df_values)

        return JSONResponse(content={"message": "File uploaded and saved as JSON successfully!"}, status_code=200)

    raise HTTPException(status_code=400, detail="Invalid file format!")


class DataModel(BaseModel):
    columns: List[str]
    values: List[List[Any]]

@app.post("/submit")
async def receive_lists(data: DataModel):
    cols, vals = read_json()
    columns = data.columns
    values = data.values
    # Например, если cols и vals - заранее определенные переменные
    if columns != cols or values != vals:
        if os.path.exists('json_files/data_filtered.json'):
            write_json_filter(columns=columns, values=values)
        else:
            write_json(columns=columns, values=values)
        return {'ok'}
    else:
        raise HTTPException(status_code=403, detail="data is the same")

@app.post("/filter")
async def receive_filtered_lists(data: DataModel):
    cols, vals = read_json()
    columns = data.columns
    values = data.values
    # Например, если cols и vals - заранее определенные переменные
    if columns != cols or values != vals:
        write_json_filter(columns=columns, values=values)
        return {'ok'}
    

@app.post("/delete_filter")
async def delete_filter():
    file_path = 'json_files/data_filtered.json'
    if os.path.exists(file_path):
        os.remove(file_path)
        return {'filter deleted'}
    
@app.get("/indexes")
async def get_table():
    cols, vals = read_json()
    return JSONResponse(content=cols)

@app.get("/values")
async def get_values():
    cols, vals = read_json()
    return JSONResponse(content=vals)

@app.get("/filtered_values")
async def get_filterd_values():
    grouped_dict = {}
    cols, vals = read_json()
    for idx, key in enumerate(cols):
        unique_values = list(set(value[idx] for value in vals))
        grouped_dict[key] = list(unique_values)

    return JSONResponse(content=grouped_dict)



@app.post("/upload_graphs/docx")
async def process_file(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    
    # Создаем новый документ
    doc = Document()
    
    # Конвертируем изображение в черно-белый
    processed_image = image.convert("L")
    
    # Сохраняем изображение в байтовый массив
    img_byte_arr = io.BytesIO()
    processed_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    
    # Вставляем изображение в документ
    doc.add_picture(img_byte_arr, width=Inches(5))  # Можно регулировать ширину по необходимости
    
    # Сохраняем документ в байтовый массив
    doc_byte_arr = io.BytesIO()
    doc.save(doc_byte_arr)
    doc_byte_arr.seek(0)
    
    return StreamingResponse(doc_byte_arr, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
@app.post("/upload_graphs/pdf")
async def process_file_pdf(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    
    processed_image = image.convert("L")
    
    img_byte_arr = io.BytesIO()
    processed_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)

    pdf_bytes = io.BytesIO()
    processed_image.save(pdf_bytes, format='PDF')
    pdf_bytes.seek(0)
    
    return StreamingResponse(pdf_bytes, media_type="application/pdf")


@app.post("/upload_graphs/pptx")
async def process_file_pptx(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    
    processed_image = image.convert("L")
    
    img_byte_arr = io.BytesIO()
    processed_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    
    presentation = Presentation()
    slide_layout = presentation.slide_layouts[5]
    slide = presentation.slides.add_slide(slide_layout)
    
    slide.shapes.add_picture(img_byte_arr, Inches(1), Inches(1), width=Inches(5))
    
    pptx_bytes = io.BytesIO()
    presentation.save(pptx_bytes)
    pptx_bytes.seek(0)
    
    return StreamingResponse(pptx_bytes, media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation")
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

