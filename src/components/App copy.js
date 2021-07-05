import React, { Component } from 'react'
import Navbar from './Navbar'
import botAbi from '../abis/MyBot.json'
import Web3 from 'web3'
import './App.css'
import Main from './Main.js'
import busdlogo from '../busdlogo.png'
import bnblogo from '../bnblogo.png'
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
    
 
 
   // Load my Bot
    const botContract = new web3.eth.Contract(botAbi, '0xbc32d6401c172D6a4A3619B6C87F3f3B75D6501f')
    this.setState({botcontractaddress : botContract._address})
    this.setState({ botContract })
    console.log(botContract._address)

    let botContractOwner = await botContract.methods._GetOwnerAddress().call()
    console.log(botContractOwner)

    let initialContractBalance = await botContract.methods.balanceOf().call()
   
    let varContractBalance =  (initialContractBalance * 10**-18).toFixed(3);
        
    console.log(initialContractBalance)
    this.setState({contractBalance:varContractBalance})
 
     
    // botContract.methods._ApproveToken(txtTokenAddress.value).send({from: this.state.account}).on('receipt', function(receipt){console.log(receipt);})
   
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
  }
  /** -------------------------------------------------------------------------------------------------------------------**/



  handleWorkshopChange(value) {
    this.setState({
        contractBalance: value.value
    });
}

//--------------------Approve Token
contractBalance =() => {
  

  
 let contractBalanceUpdated = this.state.botContract.methods.balanceOf().call()

  
console.log(contractBalanceUpdated)
}





//--------------------Refresh Contract Balance
approveToken =(address) => {
  

  this.setState({loading: true})
  this.state.botContract.methods._ApproveToken(address).send({from: this.state.account}).on('transactionHash', (hash) => {
    this.setState({loading: false})
  })

}

//-------------------Add Admin
  addAdmin =(address) => {
  

    this.setState({loading: true})
    this.state.botContract.methods._AddAdmin(address).send({from: this.state.account}).on('transactionHash', (hash) => {
      
      this.setState({loading: false})
    })
}

//----------------multiSendBNBs
multiSendBNBs =(address,amount) => {
  

  this.setState({loading: true})
  this.state.botContract.methods._bnbDistribution(address,amount).send({from: this.state.account}).on('transactionHash', (hash) => {
    this.setState({loading: false})
  })
}

//---------------Withdraw All BNBs
withdrawAll =() => {
  

  this.setState({loading: true})
  this.state.botContract.methods._WithdrawAllBNBs().send({from: this.state.account}).on('transactionHash', (hash) => {
   
  
    this.setState({loading: false})

    // let initialContractBalance =  this.state.botContract.methods.balanceOf.call().value;
     
    //   let varContractBalance =  (initialContractBalance * 10**-18).toFixed(3);
          
    //   console.log(initialContractBalance)
    //   this.setState({contractBalance:varContractBalance})
  })

}
//----------------bnbBuyCustomRoute
bnbBuyCustomRoute =(bnbAmount, tokenAddress, loopCount, addressArray) =>{
  this.setState({loading: true})
  this.state.botContract.methods.bnbBuyCustomRoute(bnbAmount, tokenAddress, loopCount, addressArray).send({from: this.state.account}).on('transactionHash', (hash) => {
    this.setState({loading: false})
})


}


//-----------------busdBuyCustomRoute
busdBuyCustomRoute =(busdAmount, tokenAddress, loopCount, addressArray) =>{
  this.setState({loading: true})
  this.state.botContract.methods.busdBuyCustomRoute(busdAmount, tokenAddress, loopCount, addressArray).send({from: this.state.account}).on('transactionHash', (hash) => {
    this.setState({loading: false})
})


}

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
        <Navbar account={this.state.account} />
           
           <Main/>
        <p id="chainTitle">{this.state.ChainName}</p>

          <div className="firstRoww">
              {/* BotContract Address */}
             
              <div className="headSection">
              <div className="subFunctionDivs">
                <p className="botContractStyle">Bot Contract Address :  </p>
                <label id="currency">{this.state.currency}</label>
                <label className="botContractAddressStyle">{this.state.botcontractaddress}</label>




          {/*---------------------------------- REFRESH CONTRACT BALANCE -------------------------------- */}
                {/* Form Approval */}
               <form className ="btnRefreshContractBalance" onSubmit={(event)=> {
                  event.preventDefault()
                  try{
                    this.contractBalance();
                 }
                 catch(e){
                   alert(e)
                 }
                }}>
                <div className="contractBalance">
                <button className="btncontractBalanceStyle" type ="submit">Contract Balance :</button>
          
                <label className="contractBalanceStyle" onChange={this.handleWorkshopChange}>{this.state.contractBalance}</label>
               
                
              </div>
            </form>
               {/*---------------------------------- WITHDRAW BNB-------------------------------- */}
               {/* Form Approval */}
               <form className ="btnWithdrawBNB" onSubmit={(event)=> {
                  event.preventDefault()
                  try{
                    this.withdrawAll();
                 }
                 catch(e){
                   alert(e)
                 }
                }}>

              <button type ="submit" id ='btnWithdrawBNB'>Withdraw</button>
              </form>
               
         

              <br/> <br/>

          {/*---------------------------------- APPROVE TOKEN-------------------------------- */}
               {/* Form Approval */}
                <form className ="approveForm" onSubmit={(event)=> {
                  event.preventDefault()
                  let tokenAddress
                  tokenAddress = this.input.value.toString()
               
                  try{
                    this.approveToken(tokenAddress)
                 }
                 catch(e){
                   alert(e)
                 }
                }}>

               {/* Token Approval */}
                 <label className="lblTitleStyle" >Approve Token for Trade on Bot Contract </label> <br/>
                <input type = "text" id="txtTokenApprove"  placeholder="Address of Token to approve" ref={(input)=> {this.input = input}}></input>
             <button type ="submit" id ='btnApprove' className="buttonLayouts">Approve Token</button>
             </form>





            {/*---------------------------------- ADD ADMINS-------------------------------- */}

             <br/><br/>
                {/* Form Add Admins */}
             <form className ="addAdminForm" onSubmit={(event)=> {
                  event.preventDefault()
                  let tokenAddress
                  tokenAddress = this.input2.value.toString()

                  try{
                    this.addAdmin(tokenAddress)
                 }
                 catch(e){
                   alert(e)
                 }
                }}>
             <br/>
                {/* Adding Admins */}
                <label className="lblTitleStyle" >Add Admin </label> <br/>
                <input type = "text" id="txtAddAdmin" placeholder="Whitelisting Address" ref={(input2)=> {this.input2 = input2}}></input>
             <button type ="submit" id ='btnAddAdmin'className="buttonLayouts">Add</button>

             </form>


                   {/*---------------------------------- Multisend BNB-------------------------------- */}

             <br/><br/>
                {/* Form MultiSendBNB */}
             <form className ="multiSendBNBForm" onSubmit={(event)=> {
                  event.preventDefault()


                  let addressArray 
                 //split the arrays
                 //input just have to put 0xbC07b4BCAdb811f73a807088A0a3BBb0131661D8,0xbC07b4BCAdb811f73a807088A0a3BBb0131661D8,0xbC07b4BCAdb811f73a807088A0a3BBb0131661D8
                  addressArray = this.addressesArray.value.split(",")

                  console.log(Array.isArray(addressArray))
       
                
                  console.log(addressArray);

                  
                  let bnbAmount = this.bnbAmount.value.toString()
              
               
                console.log(addressArray);
                try{
              
                  bnbAmount = window.web3.utils.toWei(bnbAmount,'Ether')
                   this.multiSendBNBs(addressArray,bnbAmount)
                }
                catch(e){
                  alert(e)
                }
                }}>

             <br/>
                {/* MultiSendBNB */}
                <label className="lblTitleStyle" >Multisend BNBs </label> <br/>
                <label className="lblsubTitleStyle" > Addresses </label> <br/>
                <input type = "text" id="txtAddressesArray" name ="addressArray[]" placeholder="0x0" ref={(addressesArray)=> {this.addressesArray = addressesArray}}></input><br></br>
                <label className="lblsubTitleStyle" > BNB Amount </label> <br/>
                <input type = "text" id="txtBnbAmount" placeholder="Amount" ref={(bnbAmount)=> {this.bnbAmount = bnbAmount}}></input>
             <button type ="submit" id ='btnSendBNB'className="buttonLayouts">Send</button>

             </form>

             </div>







               {/*------------------------------------------------- BNB SECTION ---------------------------------------------------- */}      
             <img src={bnblogo} width="210" height="120" className="bnbLogo" alt="" />
                <div className="bnbSection">
               
                  {/* Form bnbBuyAndCustomRoute */}
                <form className ="bnbBuyCustomRoute" onSubmit={(event)=> {
                  event.preventDefault()


                  let addressArray 
                  let tokenAddress = this.bnbCustomTokenAddress.value;
                  let loopCount = this.bnbCustomLoopCount.value;
                 //split the arrays
                 //input just have to put 0xbC07b4BCAdb811f73a807088A0a3BBb0131661D8,0xbC07b4BCAdb811f73a807088A0a3BBb0131661D8,0xbC07b4BCAdb811f73a807088A0a3BBb0131661D8
                  addressArray = this.bnbCustomAddressAray.value.split(",")
                  console.log(Array.isArray(addressArray))
              
                 
                  console.log(addressArray)
                  
      
                  let bnbAmount = this.bnbCustomAmount.value.toString()
              
               
                console.log(addressArray);
                try{
                  bnbAmount = window.web3.utils.toWei(bnbAmount,'Ether')
                   this.bnbBuyCustomRoute(bnbAmount, tokenAddress, loopCount, addressArray)
                }
                catch(e)
                {

                  alert(e)

                }
                  
                }}>

                  {/* bnbBuyCustomRoute */}
                  <div className="bnbBuyCustomRoute">
                <label className="lblBNBTitle" >Buy & Route Manually</label> <br/>
             
                <label className="lblsubTitleStyle" > BNB Amount </label> <br/>
                <input type = "text" id="txtBNBAmount" placeholder="Amount" ref={(bnbCustomAmount)=> {this.bnbCustomAmount = bnbCustomAmount}}></input>
                <br></br>
                <label className="lblsubTitleStyle" > Token Address </label> <br/>
                <input type = "text" id="txtTokenAddress"  placeholder="0x0" ref={(bnbCustomTokenAddress)=> {this.bnbCustomTokenAddress = bnbCustomTokenAddress}}></input>
              <button type ="submit" id ='btnBuy'className="buttonLayouts">Buy</button><br></br>
              <label className="lblsubTitleStyle" >Loop Count </label> <br/>
                <input type = "text" id="txtBnbAmount" placeholder="2" ref={(bnbCustomLoopCount)=> {this.bnbCustomLoopCount = bnbCustomLoopCount}}></input>
                <br></br>
                <label className="lblsubTitleStyle" > Addresses </label> <br/>
                <input type = "text" id="txtAddressesArray"  placeholder="0x0" ref={(bnbCustomAddressAray)=> {this.bnbCustomAddressAray = bnbCustomAddressAray}}></input>
               
                </div>
                    </form>
                </div>









               {/*------------------------------------------------- BUSD SECTION ---------------------------------------------------- */}      
                <img src={busdlogo} width="210" height="100" className="bnbLogo" alt="" />
                <div className="busdSection">
               
                  {/* Form busdBuyAndCustomRoute */}
                <form className ="busdBuyCustomRoute" onSubmit={(event)=> {
                  event.preventDefault()


                  let addressArray 
                  let tokenAddress = this.busdCustomTokenAddress.value;
                  let loopCount = this.busdCustomLoopCount.value;
                 //split the arrays
                 //input just have to put 0xbC07b4BCAdb811f73a807088A0a3BBb0131661D8,0xbC07b4BCAdb811f73a807088A0a3BBb0131661D8,0xbC07b4BCAdb811f73a807088A0a3BBb0131661D8
                  addressArray = this.busdCustomAddressAray.value.split(",")
                  console.log(Array.isArray(addressArray))
              
                 
                  console.log(addressArray)
                  
      
                  let busdAmount = this.busdCustomAmount.value.toString()
              
               
                console.log(addressArray);
                try{
                  busdAmount = window.web3.utils.toWei(busdAmount,'Ether')
                   this.busdBuyCustomRoute(busdAmount, tokenAddress, loopCount, addressArray)
                }
                catch(e)
                {

                  alert(e)

                }
                  
                }}>

                  {/* busdBuyCustomRoute */}
                  <div className="busdBuyCustomRoute">
                <label className="lblBNBTitle" >Buy & Route Manually</label> <br/>
             
                <label className="lblsubTitleStyle" > Busd Amount </label> <br/>
                <input type = "text" id="txtBNBAmount" placeholder="Amount" ref={(busdCustomAmount)=> {this.busdCustomAmount = busdCustomAmount}}></input>
                <br></br>
                <label className="lblsubTitleStyle" > Token Address </label> <br/>
                <input type = "text" id="txtTokenAddress"  placeholder="0x0" ref={(busdCustomTokenAddress)=> {this.busdCustomTokenAddress = busdCustomTokenAddress}}></input>
              <button type ="submit" id ='btnBuy'className="buttonLayouts">Buy</button><br></br>
              <label className="lblsubTitleStyle" >Loop Count </label> <br/>
                <input type = "text" id="txtBnbAmount" placeholder="2" ref={(busdCustomLoopCount)=> {this.busdCustomLoopCount = busdCustomLoopCount}}></input>
                <br></br>
                <label className="lblsubTitleStyle" > Addresses </label> <br/>
                <input type = "text" id="txtAddressesArray"  placeholder="0x0" ref={(busdCustomAddressAray)=> {this.busdCustomAddressAray = busdCustomAddressAray}}></input>
               
                </div>
                    </form>
                </div>

</div>

               
              </div>
              </div>
         
     
    );
  }
}

export default App;
