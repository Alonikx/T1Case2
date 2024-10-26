from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pandas as pd
from typing import List, Any, Union
from fastapi.middleware.cors import CORSMiddleware
from data_analyze import write_json, read_json, write_json_filter
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Измените на нужные вам домены
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.post("/upload")
# async def upload_file(file: UploadFile = File(...)):
#     if file.filename.endswith('.csv'):
#         contents = await file.read()
#         data = pd.read_csv(pd.compat.StringIO(contents.decode('utf-8')))
#         return JSONResponse(content={"message": "File uploaded successfully!"}, status_code=200)
#     raise HTTPException(status_code=400, detail="Invalid file format!")

class Filter(BaseModel):
    filter: str
    val: Union[int, str] 


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
        write_json(columns=columns, values=values)
        return {'ok'}
    else:
        raise HTTPException(status_code=403, detail="data is the same")

@app.post("/filter")
async def receive_lists(data: DataModel):
    cols, vals = read_json()
    columns = data.columns
    values = data.values
    # Например, если cols и vals - заранее определенные переменные
    if columns != cols or values != vals:
        write_json_filter(columns=columns, values=values)
        return {'ok'}
    else:
        raise HTTPException(status_code=403, detail="data is the same")
    
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

