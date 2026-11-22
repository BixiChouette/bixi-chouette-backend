def calculer_gold(df):
    """Calcule les 4 statistiques Gold avec de simples value_counts()."""
    if df.empty:
        return []

    return [
        # Q1 : Quartiers de départ les plus populaires
        {"category": "top_arrondissements", "value": df["start_arrondissement"].astype(str).value_counts().head(10).to_dict()},

        # Q2 : Utilisation selon l'heure de la journée (0h à 23h)
        {"category": "utilisation_par_heure", "value": df["start_time"].dt.hour.astype(str).value_counts().sort_index().to_dict()},

        # Q3 : Top 20 des stations d'arrivée
        {"category": "top_destinations", "value": df["end_station"].astype(str).value_counts().head(20).to_dict()},

        # Q4 : Utilisation par mois (saisonnalité)
        {"category": "utilisation_par_mois", "value": df["start_time"].dt.month.astype(str).value_counts().sort_index().to_dict()},
    ]
