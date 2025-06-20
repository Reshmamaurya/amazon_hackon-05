import sys
import json
import traceback
import pandas as pd
from prophet import Prophet
import matplotlib.pyplot as plt

try:
    raw_input = sys.stdin.read()
    print("📥 Input JSON:", raw_input, file=sys.stderr)
    data = json.loads(raw_input)

    df = pd.DataFrame(data)
    df.rename(columns={'date': 'ds', 'amount': 'y'}, inplace=True)
    df['ds'] = pd.to_datetime(df['ds'])

    model = Prophet()
    model.fit(df)

    future = model.make_future_dataframe(periods=30)
    forecast = model.predict(future)

    # Save plot to file (optional for frontend)
    fig = model.plot(forecast)
    plt.title("SmartSpend 30-day Forecast")
    plt.xlabel("Date")
    plt.ylabel("Predicted Spend")
    plt.tight_layout()
    fig.savefig("forecast_output.png")  # Can be sent as an image if needed

    output = forecast[['ds', 'yhat']].tail(30)
    result = {
        "series": [
            {"ds": d["ds"].strftime("%Y-%m-%d"), "yhat": d["yhat"]}
            for d in output.to_dict("records")
        ],
        "forecast": float(output["yhat"].sum()),
        "dailyAvg": float(output["yhat"].mean())
    }

    print(json.dumps(result))

except Exception as e:
    print("❌ Exception occurred:", str(e), file=sys.stderr)
    traceback.print_exc(file=sys.stderr)
    sys.exit(1)
