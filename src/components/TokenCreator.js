import React, { Component } from 'react'
import '../css/App.css'
import '../css/TokenCreator.css'
import Web3 from 'web3'
import Navbar from './Navbar'
import Builder from'../abis/Builder.json'

class TokenCreator extends Component {
  async componentWillMount(){
    await this .loadWeb3()
    await this.loadBlockchainData()
  }
  
  
  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    console.log(accounts.toString())
  
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
        const builderContract = new web3.eth.Contract(Builder, '0x2a95EB67E184BA5715FDf294670ae59459a3D25B')
        break;
      default:
        // code block
    }
    console.log(networkId)



      //Loading Token Generator Contract (Builder)

      const builderContract = new web3.eth.Contract(Builder, '0xcD25e5e4D39DCCb39d273914d6ed10D405CB9Ce8')

      this.setState({builderContractAddress : builderContract._address})
      this.setState({ builderContract })
      console.log(builderContract._address)


  }

  //----------------createToken
  createDecryptinZToken =(tokenName,tokenSymbol,tokenSupply,reflectionFee,burnFee,charityFee,charityAddress,_maxTransferAmountRate) =>{
  const web3 = window.web3
  const builderContract = new web3.eth.Contract(Builder, '0xcD25e5e4D39DCCb39d273914d6ed10D405CB9Ce8')
  let account = this.state.account
  console.log(account)
  this.setState({loading: true})

  this.state.builderContract.methods.createDecryptinZToken(tokenName,tokenSymbol,9,tokenSupply,reflectionFee,burnFee,charityFee,charityAddress,account, _maxTransferAmountRate).send({from: this.state.account, value:'300000000000000000'}).on('transactionHash', (hash) => {
 
    this.setState({loading: false})
})


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
      builderContractAddress: '0x0',
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
    <Navbar account={this.state.account} ChainName={this.state.ChainName} />
    
    <div className ="shellCompressor">
      
      <div className="groupingShell">
    
        <div className="itemsInShell">
          
      {/* Form bnbBuyAndCustomRoute */}
      <form className ="createDecryptinZToken" onSubmit={(event)=> {
                  event.preventDefault()


           
                  let tokenName = this.tokenName.value;
                  let tokenSymbol = this.tokenSymbol.value;
                  let tokenSupply = this.tokenSupply.value;
                  let reflectionFee = this.reflectionFee.value;
                  let burnFee = this.burnFee.value;
                  let charityFee = this.charityFee.value;
                  let charityAddress = this.charityAddress.value;
                  let _maxTransferAmountRate = this._maxTransferAmountRate.value;
       
                try{
                
                   this.createDecryptinZToken(tokenName,tokenSymbol,tokenSupply,reflectionFee,burnFee,charityFee,charityAddress,_maxTransferAmountRate)
                }
                catch(e)
                {

                  alert(e)

                }
                  
                }}>

                  {/* bnbBuyCustomRoute */}
                  
                  <div className="bnbBuyCustomRoute">
                  <div className ="lblTitle">
      <label>Generating Token for {this.state.ChainName}</label> </div><br/>
                  <div className="left"> 
                 
             
                <label className="lblsubTitleStyle" > Token Name:</label> <br/>
                <input type = "text" id="txtTokenName" placeholder="e.g. Ethereum" ref={(tokenName)=> {this.tokenName = tokenName}}></input>
                <br></br>
                <label className="lblsubTitleStyle" > Token Symbol: </label> <br/>
                <input type = "text" id="txtTokenAddress"  placeholder="ETH" ref={(tokenSymbol)=> {this.tokenSymbol = tokenSymbol}}></input>
          <br></br>
              <label className="lblsubTitleStyle" >Supply: </label> <br/>
                <input type = "text" id="txtBnbAmount" placeholder="10000" ref={(tokenSupply)=> {this.tokenSupply = tokenSupply}}></input>
                <br></br>
                <label className="lblsubTitleStyle" > Reflection Fee: </label> <br/>
                <input type = "text" id="txtAddressesArray"  placeholder="0" ref={(reflectionFee)=> {this.reflectionFee = reflectionFee}}></input>
                <br></br>
                <label className="lblsubTitleStyle" > Burn Fee: </label> <br/>
                <input type = "text" id="txtBNBAmount" placeholder="0" ref={(burnFee)=> {this.burnFee = burnFee}}></input>
               </div>
                <div className="right"> 
                
                <br></br>
                <label className="lblsubTitleStyle" > Charity Fee: </label> <br/>
                <input type = "text" id="txtTokenAddress"  placeholder="0x0" ref={(charityFee)=> {this.charityFee = charityFee}}></input>
      <br></br>
      <br></br>
              <label className="lblsubTitleStyle" >Charity Address: </label> <br/>
                <input type = "text" id="txtBnbAmount" placeholder="0x0" ref={(charityAddress)=> {this.charityAddress = charityAddress}}></input>
                <br></br>
                <br></br>
                <label className="lblsubTitleStyle" >Max Transaction Rate (%) </label> <br/>
                <input type = "text" id="txtBnbAmount" placeholder="%" ref={(_maxTransferAmountRate)=> {this._maxTransferAmountRate = _maxTransferAmountRate}}></input>
                <br></br>
                <br></br>
                <button type ="submit" id ='btnBuy'className="buttonLayouts">Generate Token</button>
                {/* <label className="lblsubTitleStyle" > Addresses </label> <br/>
                <input type = "text" id="txtAddressesArray"  placeholder="0x0" ref={(bnbCustomAddressAray)=> {this.bnbCustomAddressAray = bnbCustomAddressAray}}></input> */}
                </div>
                </div>

                    </form>
                    </div>
                </div>
      </div>
      <div className ="shellCompressor">
      
      <div className="groupingShell">
    
        <div className="itemsInShell">

                  {/* bnbBuyCustomRoute */}
                  
                  <div className="bnbBuyCustomRoute">
                  <div className ="lblTitle">
                  <label>GENERATE YOUR OWN TOKEN WITH 3 EASY STEPS!</label> </div><br/>
                  <label className="lblNoteTitle" > Step 1 :</label> <br></br>
                  <label className="lblsubTitleStyle" >Fill in the Token Generation Form </label> <br/><br/>
                  <label className="lblNoteTitle" > Step 2 :</label> <br></br>
                  <label className="lblsubTitleStyle" >Click on the "Generate Token Button" </label> <br/><br/>
                  <label className="lblNoteTitle" > Step 3 :</label> <br></br>
                  <label className="lblsubTitleStyle" >Confirm Transaction on Metamask </label> <br/><br/>
                  <label className="lblNoteTitle" > NOTE:</label> <br></br>
                  <label className="lblsubTitleStyle" > Tokens Generated will have its contract Auto Verified! </label> <br/>
                  <label className="lblsubTitleStyle" > A Fee of 0.3 BNB will be charged for the creation of token (Exclusive of Gas fees) </label> <br/><br/>
                {/* <label className="lblsubTitleStyle" > Addresses </label> <br/>
                <input type = "text" id="txtAddressesArray"  placeholder="0x0" ref={(bnbCustomAddressAray)=> {this.bnbCustomAddressAray = bnbCustomAddressAray}}></input> */}
                </div>
            

                
                    </div>
                </div>
                </div>
      </div>



);
}
}
export default TokenCreator;