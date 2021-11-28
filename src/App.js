//import Pay from './Pay';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path = "/pay">
                    <Pay />
                </Route>
                <Route path ="/success">
                    <Success />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;

// function App() {
//   return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
// );
// }

