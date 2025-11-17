import { useState, useEffect } from "react";
import Input from "./components/Input";

function App() {
  const [GoldPrice, setGoldPrice] = useState(0);
  const [Taxes, setTaxes] = useState(0);
  const [totalGrams, setTotalGrams] = useState(0);

  const [LoPriceInput, setLoPriceInput] = useState(0);
  const [LoPriceResult, setLoPriceResult] = useState(0);

  const [inputValues, setInputValues] = useState({
    K24: 0,
    K21: 0,
    K18: 0,
    K14: 0,
  });

  // حساب مجموع الجرامات (دهب صافي)
  useEffect(() => {
    const total =
      inputValues.K21 +
      inputValues.K24 * (24 / 21) +
      inputValues.K18 * (18 / 21) +
      inputValues.K14 * (14 / 21);
    setTotalGrams(total);
  }, [inputValues]);

  // قيمة الذهب الصافي
  const pureGoldPrice = totalGrams * GoldPrice;

  // قيمة الخصم
  const taxes = pureGoldPrice * (Taxes / 100);

  // السعر بعد الخصم
  const priceAfterDiscount = pureGoldPrice - taxes;

  // تحديث LoPriceResult عندما يتغير LoPriceInput
  useEffect(() => {
    if (totalGrams > 0) {
      const percentage = ((LoPriceInput / totalGrams - GoldPrice) / GoldPrice) * 100;
      setLoPriceResult(percentage);
    } else {
      setLoPriceResult(0);
    }
  }, [LoPriceInput, GoldPrice, totalGrams]);

  // دالة مشتركة لمسح الحقل عند التركيز
  const handleFocus = (setter) => (e) => {
    e.target.value = ""; 
    setter(0); 
  };

  return (
    <div className="min-h-screen p-5 bg-background flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-center">سعر عيار 21</h1>

      {/* سعر الذهب */}
      <div className="w-full max-w-md flex flex-col gap-3">
        <label className="text-xl font-semibold">سعر الذهب</label>
        <input
          type="number"
          step="0.01"
          className="p-2 rounded-2xl text-2xl border focus:outline-none focus:ring-2 focus:ring-green-500"
          value={GoldPrice}
          onFocus={handleFocus(setGoldPrice)}
          onChange={(e) => setGoldPrice(parseFloat(e.target.value) || 0)}
        />
      </div>

      {/* نسبة الخصم */}
      <div className="w-full max-w-md flex flex-col gap-3">
        <label className="text-xl font-semibold">نسبة الخصم %</label>
        <input
          type="number"
          step="0.01"
          className="p-2 rounded-2xl text-2xl border focus:outline-none focus:ring-2 focus:ring-green-500"
          value={Taxes}
          onFocus={handleFocus(setTaxes)}
          onChange={(e) => setTaxes(parseFloat(e.target.value) || 0)}
        />
      </div>

      {/* مدخلات العيارات */}
      <div className="bg-emerald-300 rounded-lg p-5 flex flex-col gap-5 w-full max-w-lg">
        {["24", "21", "18", "14"].map((karat) => (
          <Input
            key={karat}
            karat={karat}
            value={inputValues["K" + karat]}
            onFocus={() => setInputValues((prev) => ({ ...prev, ["K" + karat]: 0 }))}
            onValueChange={(value) =>
              setInputValues((prev) => ({
                ...prev,
                ["K" + karat]: value,
              }))
            }
          />
        ))}
      </div>

      {/* السعر بعد الخصم و المخصوم */}
      <div className="flex flex-col md:flex-row gap-5 w-full justify-center max-w-3xl">
        <div className="flex-1 flex flex-col items-center gap-3">
          <button className="bg-green text-2xl font-bold rounded-lg p-4 w-full md:w-auto">
            السعر بعد الخصم
          </button>
          <div className="result-box flex text-2xl gap-3 items-center">
            <p className="text-3xl font-bold">{priceAfterDiscount.toFixed(2)}</p>
            <p className="font-semibold">EG</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center gap-3">
          <button className="bg-green text-2xl font-bold rounded-lg p-4 w-full md:w-auto">
            المخصوم
          </button>
          <div className="result-box flex text-2xl gap-3 items-center">
            <p className="text-3xl font-bold">{taxes.toFixed(2)}</p>
            <p className="font-semibold">EG</p>
          </div>
        </div>
      </div>

      {/* لو السعر + النسبة هتبقي */}
      <div className="flex flex-col md:flex-row gap-5 w-full max-w-3xl mt-5">
        <div className="flex-1 flex flex-col items-center gap-3">
          <button className="bg-green text-2xl font-bold rounded-lg p-4 w-full md:w-auto">
            لو السعر
          </button>
          <input
            type="number"
            step="0.01"
            className="p-2 rounded-2xl text-2xl border focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
            value={LoPriceInput}
            onFocus={handleFocus(setLoPriceInput)}
            onChange={(e) => setLoPriceInput(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="flex-1 flex flex-col items-center gap-3">
          <button className="bg-green text-2xl font-bold rounded-lg p-4 w-full md:w-auto">
            النسبة هتبقي
          </button>
          <div className="result-box flex text-2xl gap-3 items-center">
            <p className="text-3xl font-bold">{LoPriceResult.toFixed(2) * -1 }</p>
            <p className="font-semibold">%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
