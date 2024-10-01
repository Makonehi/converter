import {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import russiaFlag from './Photo/russia.png'
import euroFlag from './Photo/europa.png'
import chinaFlag from './Photo/china.png'
import usaFlag from './Photo/velika.png'
import change1 from './Photo/change1.png'


type Currency = "RUB" | "EUR" | "CNY" | "GBP";

interface FlagImages {
    [key: string]: string;
}

export default function App() {
    const [exchangeRates, setExchangeRates] = useState<Record<Currency,number>>({})
    const [amount, setAmount] = useState<number>(0)
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
    const [selectedCurrency, setSelectedCurrency] = useState<Currency>("GBP");
    const [selectedCurrency2, setSelectedCurrency2] = useState<Currency>("RUB");
    const [keyy] = useState("83b20cbb734f0429195dc898");


    const flagImages: FlagImages = {
        RUB: russiaFlag,
        EUR: euroFlag,
        CNY: chinaFlag,
        GBP: usaFlag,
    };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(e.target.value as Currency);
    };

    const handleCurrencyChangeTwo = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency2(e.target.value as Currency);
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value))
    }

    const headleSwap = () => {
        setSelectedCurrency2(selectedCurrency)
        setSelectedCurrency(selectedCurrency2)
    }

    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/${keyy}/latest/USD`)
            .then(response =>
                response.json())
            .then(data => {
                setExchangeRates(data.conversion_rates);
            });
    }, [keyy]);

    useEffect(() => {
        if (exchangeRates[selectedCurrency] && exchangeRates[selectedCurrency2]){
            const rateFrom = exchangeRates[selectedCurrency];
            const rateTo = exchangeRates[selectedCurrency2];
            const result = (amount * (rateTo / rateFrom))
            setConvertedAmount(result)
        } else{
            setConvertedAmount(null)
        }
    },[amount, exchangeRates, selectedCurrency, selectedCurrency2])


    return (
        <>
            <header className="flex justify-center h-screen items-center bg-fon">
                <div className="w-containerw h-containery bg-main rounded-lg">
                    <h2 className="text-2xl text-indigo-950 font-bold mt-12 text-center">Currency Converter</h2>
                    <p className="flex justify-center opacity-55 text-center mt-2.5">Check live rates, set rate
                        alerts,
                        receive notifications and more.</p>
                    <p className="mt-16 ml-5 text-stone-400">Amount</p>
                    <div className="convert ml-5 shadow-md w-80 rounded-2xl	p-3">
                        <div className="convert_1 flex">
                            {flagImages[selectedCurrency] && <img src={flagImages[selectedCurrency]} alt="flag"/>}
                            <select className="form-select max-w-32 ml-3" onChange={handleCurrencyChange}
                                    aria-label="Пример выбора по умолчанию" value={selectedCurrency}>
                                <option value="GBP">£ Funt</option>
                                <option value="RUB">₽ Ruble</option>
                                <option value="EUR">€ Euro</option>
                                <option value="CNY">¥ Yuan</option>
                            </select>
                            <input type="number" onChange={handleAmountChange} className="form-control w-28 ml-6" min="0" id="validationDefault01"
                                   required/>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="rounded-full hover:bg-blue-700 bg-blue-900 w-11 h-11 mt-3.5 mb-3.5 flex justify-center items-center"
                                onClick={headleSwap}>
                                <img className="" src={change1} alt="000"/></button>
                        </div>
                        <p className="text-stone-400">Converted Amount</p>
                        <div className="convert_2 flex">
                            {flagImages[selectedCurrency2] && <img src={flagImages[selectedCurrency2]} alt="flag"/>}
                            <select className="form-select max-w-32 ml-3" onChange={handleCurrencyChangeTwo}
                                    aria-label="Пример выбора по умолчанию" value={selectedCurrency2}>
                                <option value="GBP">£ Funt</option>
                                <option value="RUB">₽ Ruble</option>
                                <option value="EUR">€ Euro</option>
                                <option value="CNY">¥ Yuan</option>
                            </select>
                            <input type="number" value={convertedAmount ?? ''} className="form-control w-28 ml-6" min="0" id="validationDefault01"
                                   required/>
                        </div>
                    </div>
                    <div className="mt-7 ml-5">
                        <p className="text-stone-400">Indicative Exchange Rate</p>
                    </div>
                </div>
            </header>

        </>
    )
}
