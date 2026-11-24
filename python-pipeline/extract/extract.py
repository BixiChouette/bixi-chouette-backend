import pandas as pd
from pymongo import MongoClient

def extraire_bronze():
    """Extrait les données brutes depuis la collection bronze_trips."""
    client = MongoClient("mongodb://localhost:27017")
    docs = client["bixi_chouette"]["bronze_trips"].find({}, {"rawData": 1, "_id": 0}).limit(100000)
    lignes = [d.get("rawData", {}) for d in docs]
    client.close()

    return pd.DataFrame(lignes)
