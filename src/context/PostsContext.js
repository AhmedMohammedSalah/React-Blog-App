import { createContext, useCallback } from "react";
import useFetchCol from "../hooks/useFetchCol";

export const PostsContext = createContext();
export const PostsProvider = ( { children } ) => {
    const {  loading,error,data,getData,getNextData,fetching,lastDoc } = useFetchCol( "posts" );
    
    const fetch = useCallback(() => {
        if ( !data ) {
            getData();
        }
    }, [getData, data] )
    const fetchNext = useCallback( () => {
        if ( data&&!loading&&!fetching&&lastDoc ) {
            getNextData(lastDoc);
        }
    }, [getNextData, data,loading,fetching,lastDoc] )
    


    const refetch = getData;

    return <PostsContext.Provider value={{ loading,error,data,fetch,fetching,fetchNext,refetch}}>
        {children}
    </PostsContext.Provider>
}
