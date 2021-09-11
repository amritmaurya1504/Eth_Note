import React, { Component } from 'react';
import Nav from "./Nav";
import './App.css';
import Web3 from 'web3';
import Note from "../abis/Note.json"

class App extends Component {

  async componentDidMount(){
    await this.loadWeb3()
    await this.loadBlockChainData()
  }

  async loadWeb3(){
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }else{
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockChainData(){
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts();
    this.setState({account : accounts[0]});

    const networkId = await web3.eth.net.getId();
    const networkData = Note.networks[networkId];
    if(networkData){
      const noteContract = web3.eth.Contract(Note.abi , networkData.address);
      this.setState({noteContract});

      const notesCount = await noteContract.methods.noteCount().call();
      console.log(notesCount.toNumber());
      this.setState({ notesCount });
      for (var i = 1; i <= notesCount; i++) {
        const image = await noteContract.methods.notes(i).call()
        this.setState({
          notes: [...this.state.notes, image]
        })
      }
      console.log(this.state.notes)
      this.setState({ loading : false })
    }else{
      window.alert('Note Contract not deployed to detected network!');
    }

  }
  createNote = description => {


      this.setState({ loading: true })
      this.state.noteContract.methods.createNote(description).send({ from: this.state.account });
      this.setState({ loading : false })
  }

  constructor(props){
    super(props)
    this.state = {
      account: '',
      noteContract : null,
      notes : [],
      loading : true
    }
  }

  render() {
    return (
      <div>
       <Nav account={this.state.account} />
         <div className="container-lg my-4">
           <h4 className="display-6">Welcome to my Dapp! 😃 </h4>
         </div>
         {
           this.state.loading ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            : (
              <div className="container-lg my-5">
            <div className="row">
                <div className="col-6">
                    <div className="left bg-dark p-5">
                        <input 
                        id="imageDescription"
                        type="text"
                        type="text" 
                        className="form-control" 
                        placeholder="Enter Your Note" />
                        <br />
                        <button  
                         onClick={(event) => {
                             event.preventDefault()
                             const description = document.getElementById('imageDescription').value
                             this.createNote(description)
                         }}
                        className="btn btn-danger">Add note</button>
                    </div>
                </div>
                <div className="col-6">
                    <div class="row row-cols-1 row-cols-md-2 g-4">
                    {
                      this.state.notes.map((note) => {
                        return (
                          <div class="col col-6" key={note.id}>
                            <div class="card">
                                <div class="card-body">
                                    <small class="card-title fw-bold">Author : {note.author}</small>
                                    <p class="card-text">{note.description}</p>
                                </div>
                            </div>
                        </div>
                        )
                      })
                    }
                    </div>
                </div>
            </div>
        </div>
              )
         }
      </div>
    );
  }
}

export default App;
