import React, { Component } from 'react'
import Navbar from './Navbar'
import Web3 from 'web3'
import '../css/App.css'
import '../css/Main.css'
import Main from './Main.js'
import TokenCreator from './TokenCreator.js'

import { BrowserRouter, Route, withRouter, Switch } from 'react-router-dom';
import { Link } from "react-router-dom";


class App extends Component {

async componentWillMount(){
  await this .loadWeb3()
  await this.loadBlockchainData()
}


async loadBlockchainData(){
  const web3 = window.web3
  const accounts = await web3.eth.getAccounts()
  this.setState({account: accounts[0]})

  const networkId = await web3.eth.net.getId()
  switch(networkId) {
    case 56:
      console.log("Binance Smart Chain Detected")
      this.setState({ChainName: "Binance Smart Chain"})
      this.setState({currency: "BNB"})

      break;
    case 1:
      console.log("Ethereum Mainnet Detected")
      this.setState({ChainName: "Ethereum Mainnet"})
      this.setState({currency: "ETH"})
      break;

    case 97:
      console.log("BSC Testnet Detected")
      this.setState({ChainName: "BSC Testnet"})
      this.setState({currency: "TestBNB"})
      break;
    default:
      // code block
  }
  console.log(networkId)
    
 
   
}
  
 //Load Web3
  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }

    else if (window.web3)
    {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('Non-Ethereum browser detected. You should consider trying metamask')
    }
    this.setState({loading: false});
  }
  /** -------------------------------------------------------------------------------------------------------------------**/




  /** ---------------------------------------------------------------------------------------------------------------------------------------------**/
  constructor(props) {
    super(props)
    this.state = {
      ChainName:"",
      account: '0x0',
      botContractAddress: '0x0',
      botContract:{},
      contractBalance:"",
      bnbBalance: '0',
      _ApproveToken:'',
      loading: true
    }
  }


  //HTML
  render() {
    let content 

    if(this.state.loading){
      content = <p id="loader" className ="text-center">Loading...</p>

      
    }
    else{
      content = <Main/>
      
    }

    

    return (
      <div>
           <Navbar account={this.state.account} ChainName={this.state.ChainName} />
       
        {content}
    
           </div>
    );
 
}
}

export default App;
