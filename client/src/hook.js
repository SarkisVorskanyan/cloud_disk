// function useInterval(callback, delay) {
    //   const savedCallback = useRef();
    
    //   // Remember the latest callback.
    //   useEffect(() => {
    //     savedCallback.current = callback;
    //   }, [callback]);
    
    //   // Set up the interval.
    //   useEffect(() => {
    //     let id = setInterval(() => {
    //       savedCallback.current();
    //     }, delay);
    //     return () => clearInterval(id);
    //   }, [delay]);
    // }
    
    // function App() {
    //   const [counter, setCounter] = useState(0);
    
    //   useInterval(() => {
    //     setCounter(counter + 1);
    //   }, 1000);
    
    //   return <h1>{counter}</h1>;
    // };