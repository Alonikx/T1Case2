import pandas as pd
import json
import os
# df_tasks = pd.read_csv('datasets/11samara_tasks_обезличенная.csv',sep=';', encoding='utf-8').fillna('-')[:100]
# df_columns = df_tasks.columns.tolist()
# df_values = df_tasks.values.tolist()
def write_json(columns, values):
    json_data = {'indexes':columns, 'values': values}
    with open('json_files/data.json', 'w') as json_file:
        json.dump(json_data, json_file, indent=4)


def read_json():
    if not os.path.exists('json_files/data_filtered.json'):
        path = 'json_files/data.json'
    else:
        path = 'json_files/data_filtered.json'
    with open(path, 'r') as json_file:
        data = json.load(json_file)  # Загрузка файла один раз
        df_column = data['indexes']
        df_values = data['values'][:150]
        return df_column, df_values
        


def write_json_filter(columns, values):
    json_data = {'indexes':columns, 'values': values}
    with open('json_files/data_filtered.json', 'w') as json_file:
        json.dump(json_data, json_file, indent=4)
# df_history = pd.read_csv('datasets/samara-tasks-history.csv',sep=',', encoding='utf-8')