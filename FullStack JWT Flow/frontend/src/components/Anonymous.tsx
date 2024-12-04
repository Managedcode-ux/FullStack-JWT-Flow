import {useFreeQuoteQuery} from '../services/quotesApi.ts'


const AnonymousQuotes = () => {
    const {data} = useFreeQuoteQuery(undefined,{refetchOnMountOrArgChange:true})
    console.log(data)
    if(data){
        return(JSON.stringify(data))
    }
    return(
        <h1>welcome to anonymouns quote page</h1>
    )

}

export default AnonymousQuotes