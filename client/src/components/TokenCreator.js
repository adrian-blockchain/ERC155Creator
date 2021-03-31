import React, { Component } from "react";
import Kyra from "../contracts/Kyra.json"

import Web3 from "web3";


class App extends Component {
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData(){

        try {

        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        console.log(accounts)
        this.setState({account: accounts[0]})
        const networkId = await web3.eth.net.getId()
        const networkData = Kyra.networks[networkId]
        if (networkData) {
            const kyra = web3.eth.Contract(Kyra.abi, networkData.address)
            console.log(kyra)
            this.setState({kyra})
            const newToken = await kyra.methods.newToken().call()
            console.log(newToken.toString())
            this.setState({loading: false})
        }else {
            window.alert("Le smart contract n'est pas détécté")
        }
        } catch (err){
            console.error(err)
        }
    }

    createToken(owner, id, data){
        this.setState({loading: true})
        this.state.kyra.methods.createToken(owner, id, data).send({from: this.state.account})
            .once('receipt', (receipt)=>{
                this.setState({loading:false})
            })
    }


    constructor(props) {
        super(props);
        this.state = {
            owner: '',
            id: '',
            data: ''

        }
        this.createToken = this.createToken.bind(this)
    }

    render() {
        return(
            <div>
                <p>Compte web3: {this.state.account}</p>

                <br/>

                <label htmlFor="newToken">Créer un token</label>
                <form onSubmit={(event => {
                    event.preventDefault()
                    const owner = this.owner.value
                    const id = this.id.value
                    const data = this.data.value
                })}>
                    <br/>
                    <label>Laisser vide si la montre n'as pas de proprétaire</label>
                    <div className="form-group mr-sm-2">
                    <input
                    id="owner"
                    type="text"
                    ref={(input) =>{ this.owner =input}}
                    placeholder="Owner"
                    />
                    </div>

                    <div className="form-group mr-sm-2">
                    <input
                    id="id"
                    type="text"
                    ref={(input)=>{this.id =input}}
                    placeholder="Numéro de série ou id"
                    />
                    </div>

                    <div className="form-group mr-sm-2">
                    <input
                        id="data"
                        type="text"
                        ref={(input)=>{this.data =input}}
                        placeholder="Donné supplémentaire"
                    />
                    </div>

                    <button type="submit">Créer</button>
                </form>

            </div>
        )
    }


}

export default App;
