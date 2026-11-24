from pymongo import MongoClient

def get_collection(nom):
    client = MongoClient("mongodb://localhost:27017")
    return client["bixi_chouette"][nom]

def charger_silver(df, taille_lot=5000):
    if df.empty:
        return

    records = df.to_dict("records")
    col = get_collection("silver_trips")
    
    # Insertion par paquets de 5 000
    for i in range(0, len(records), taille_lot):
        col.insert_many(records[i:i + taille_lot], ordered=False)

    print(f"{len(df)} trajets insérés dans silver_trips.")

def charger_gold(stats):
    if stats:
        col = get_collection("gold_stats")
        for s in stats:
            col.update_one({"category": s["category"]}, {"$set": s}, upsert=True)
        print(f"{len(stats)} statistiques enregistrées dans gold_stats.")
