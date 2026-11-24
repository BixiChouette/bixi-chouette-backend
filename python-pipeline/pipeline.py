import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from extract.extract import extraire_bronze
from transform.clean_silver import nettoyer_vers_silver
from transform.compute_gold import calculer_gold
from load.load import charger_silver, charger_gold

def executer_pipeline():
    print("Démarrage du pipeline")

    # 1. Extraction Bronze
    df_bronze = extraire_bronze()
    if df_bronze.empty:
        print("Aucune donnée dans Bronze. Exécutez d'abord l'import CSV.")
        return

    # 2. Nettoyage et chargement Silver
    df_silver = nettoyer_vers_silver(df_bronze)
    charger_silver(df_silver)

    # 3. Calculs analytiques et chargement Gold
    stats_gold = calculer_gold(df_silver)
    charger_gold(stats_gold)

    print("Pipeline terminé")

if __name__ == "__main__":
    executer_pipeline()
