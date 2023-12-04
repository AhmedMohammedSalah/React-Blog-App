import{ useCallback, useContext, useState } from 'react'
import { FirebaseContext } from '../context/FirebaseContext';
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';

const useFetchCol = (colName) => {

    const {db}=useContext(FirebaseContext)
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState( false );
    const [fetching, setFetching] = useState( false );
    const [lastDoc, setLastDoc] = useState( null );
    const getData = useCallback( async () => {
        setLoading( true );
        console.log("try start " );

        try {
            const colRef = collection( db, colName )
            const q =query( colRef,orderBy('createdAt','desc'),limit(8) )
            const res = await getDocs( q );
            const resData = res.docs.map( doc => {
                const docData = doc.data();
                const createdAt = docData.createdAt ? docData.createdAt.toDate() : "null";
                // console.log( createdAt ); // قم بتحديد هل يتم عرض docData بشكل صحيح في وحدة تحكم المتصفح

                return {
                    id: doc.id,
                    ...docData,
                    createdAt,
                };
            } );

            setData( resData );
            setLastDoc( res.docs[res.docs.length - 1] );
            
            
        } catch (error) {
            setError( error.message );
            console.log( error.message );

        }
        setLoading( false );

   // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )
    const getNextData = useCallback( async (lastVisable) => {
        setFetching( true );
        console.log("try start " );

        try {
            const colRef = collection( db, colName )
            const q =query( colRef,orderBy('createdAt','desc'),limit(8),startAfter(lastVisable) )
            const res = await getDocs( q );
            const resData = res.docs.map( doc => {
                const docData = doc.data();
                const createdAt = docData.createdAt ? docData.createdAt.toDate() : "null";
                // console.log( createdAt ); // قم بتحديد هل يتم عرض docData بشكل صحيح في وحدة تحكم المتصفح

                return {
                    id: doc.id,
                    ...docData,
                    createdAt,
                };
            } );

            setData( data => [...data,...resData] );
            setLastDoc( res.docs[res.docs.length - 1] );
            
            
        } catch (error) {
            setError( error.message );
            console.log( error.message );

        }
        setFetching( false );
   // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
    return {
        loading,error,data,getData,lastDoc,getNextData,fetching
    }
}

export default useFetchCol
