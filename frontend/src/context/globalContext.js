import React, { useContext, useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify";


const BASE_URL = "http://localhost:4000/api/v1/";


const GlobalContext = React.createContext()
const user= JSON.parse(sessionStorage.getItem("user"))
export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income/${user._id}`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes/${user._id}`)
        setIncomes(response.data.expensives)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense/${user._id}`, income)
            .catch((err) =>{
                toast.error(err.response.data.message)
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses/${user._id}`)
        setExpenses(response.data.expensives)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 10)
    }
    const [searchText, setSearchText] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [searchIncomesData, setSearchIncomesData] = useState([]);
    const [searchExpensesData, setSearchExpensesData] = useState([]);
    
    const searchInHistory = () => {
        const searches = [...searchIncomesData, ...searchExpensesData];
        searches.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    
        return searches.slice(0, 10);
    };
    
    const searchExpense = async () => {
        try {
            let url = `${BASE_URL}search-expense/${user._id}`;
            let queryParams = [];
    
            if (searchText) {
                queryParams.push(`title=${searchText}`);
            }
    
            if (searchDate) {
                let start = new Date(searchDate);
                queryParams.push(`date=${searchDate}`);
            }
    
            if (queryParams.length > 0) {
                url += '?' + queryParams.join('&');
            }
    
            const response = await axios.get(url);
            if (response.data && response.data.data) {
                setSearchExpensesData(response.data.data);
            } else {
                setSearchExpensesData([]);
            }
        } catch (error) {
            console.error("Error fetching expenses:", error);
            setSearchExpensesData([]);
        }
    };
    
    const searchIncome = async () => {
        try {
            let url = `${BASE_URL}search-income/${user._id}`;
            let queryParams = [];
    
            if (searchText) {
                queryParams.push(`title=${searchText}`);
            }
    
            if (searchDate) {
                let start = new Date(searchDate);
                queryParams.push(`date=${searchDate}`);
            }
    
            if (queryParams.length > 0) {
                url += '?' + queryParams.join('&');
            }
    
            const response = await axios.get(url);
            if (response.data && response.data.data) {
                setSearchIncomesData(response.data.data);
            } else {
                setSearchIncomesData([]);
            }
        } catch (error) {
            console.error("Error fetching incomes:", error);
            setSearchIncomesData([]);
        }
    };
    
    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            searchText,
            setSearchText,
            searchDate,
            setSearchDate,
            searchExpense,
            searchIncome,
            searchInHistory
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}