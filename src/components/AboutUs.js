import React, { Component } from 'react'
import '../css/App.css'
import Web3 from 'web3'
import Navbar from './Navbar'
class TokenCreator extends Component {
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
render()

{
return(
  
  <div id="bodySection" className="bodySection">
     <Navbar account={this.state.account} />
    <p > Hello World!</p>
    <p > Hell222o World!</p>
    <p > Hello22 World!</p>
    <p > Hell22asasasa2o World!</p> 
    </div>
);
}
}
export default TokenCreator;