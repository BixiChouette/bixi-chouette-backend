import pandas as pd

def nettoyer_vers_silver(df):
    """Nettoie les données brutes et calcule la durée des trajets."""
    if df.empty:
        return pd.DataFrame()

    # Supprime les trajets avec stations manquantes
    df = df.dropna(subset=["STARTSTATIONNAME", "ENDSTATIONNAME"]).copy()

    # Conversion des millisecondes en dates 
    # (errors="coerce" remplace les valeurs invalides par NaN au lieu de planter)
    
    df["start_time"] = pd.to_datetime(pd.to_numeric(df["STARTTIMEMS"], errors="coerce"), unit="ms")
    df["end_time"] = pd.to_datetime(pd.to_numeric(df["ENDTIMEMS"], errors="coerce"), unit="ms")
    df["duration"] = (df["end_time"] - df["start_time"]).dt.total_seconds()

    # Conserve les trajets réalistes (entre 1 minute et 24 heures)
    df = df[(df["duration"] > 60) & (df["duration"] < 86400)]

    return pd.DataFrame({
        "start_station": df["STARTSTATIONNAME"],
        "start_arrondissement": df.get("STARTSTATIONARRONDISSEMENT", "Non spécifié"),
        "end_station": df["ENDSTATIONNAME"],
        "end_arrondissement": df.get("ENDSTATIONARRONDISSEMENT", "Non spécifié"),
        "start_time": df["start_time"],
        "end_time": df["end_time"],
        "duration": df["duration"]
    })
