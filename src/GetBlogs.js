// import { useState, useEffect } from 'react';

// const useGetBlogs = (url) => {
//     const [data, setData] = useState(null);
//     const [isPending, setPending] = useState(true);
//     const [fetchingError, setFetchingError] = useState(null);

//     useEffect(() => {
//         const abortCount = new AbortController();

//         fetch(url, { signal: abortCount.signal })
//             .then((response) => response.json())
//             .then((data) => {
//                 setData(data);
//                 setPending(false);
//             })
//             .catch((error) => {
//                 if (error.name === 'AbortError') {
//                     console.log("Fetch Aborted");
//                 } else {
//                     setFetchingError(error.message);
//                     console.log(fetchingError);
//                 }
//             });

//         return () => abortCount.abort();  // Cleanup function to abort fetch
//     }, [url, fetchingError]);

//     return { data, isPending, fetchError: fetchingError };  // Make sure this is returned
// };

// export default useGetBlogs;
