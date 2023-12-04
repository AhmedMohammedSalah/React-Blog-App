import  { useContext, useState } from 'react'
import { FirebaseContext } from '../context/FirebaseContext';
import { collection, getDocs, query, where } from 'firebase/firestore';

const useFetchDoc = (colName,slug) => {
    const { db } = useContext( FirebaseContext );
    const [loading, setLoading] = useState( false );
    const [error, setErorr] = useState( null );
    const [data, setData] = useState( null );
    const getData = async() => {
        setLoading( true );
        try {
            const colRef = collection( db, colName );
            const q = query( colRef, where( 'slug', '==', slug ) );
            const res =await  getDocs( q );
            const resData = res.docs.map( doc => {
                const docData = doc.data();
                return {
                    id: doc.id,
                    ...docData,
                    createdAt: docData.createdAt.toDate()
                };
            } );
            
            if (resData&&resData.length) {
                setData( resData[0] );
            };
        } catch (error) {
            setErorr( error.message );
        }
        setLoading( false );
    }
    
    return {
        data,error,loading,getData
    };  
}

export default useFetchDoc
