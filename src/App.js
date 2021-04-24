import Torus from "@toruslabs/torus-embed"
import WalletConnectProvider from "@walletconnect/web3-provider"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '@sweetalert2/theme-dark/';
import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from "web3";
import Web3Modal, { Provider } from "web3modal";
import logo from "./img/1577 [Converted].png"
import rightimg from "./img/mobile.png"
import stakeplaceholder from "./img/nft-icon.png"
import lotteryimage from "./img/lottery.jpg"
import github from "./img/github.png"
import twitter from "./img/twitter.png"
import telegram from "./img/telegram.png"
import medium from "./img/medium.png"
import './css/maincss.css';
import './css/resetcss.css';
let provider;
let myaddress;
let web3;
let Tokeninstance;
let Lnftinstance;
let Lstoreinstance;
const MySwal = withReactContent(Swal)
var tokenabi=[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_minter",
        "type": "address"
      }
    ],
    "name": "AddMinter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "Recipient",
        "type": "address"
      }
    ],
    "name": "CollectFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "TypeOfExclude",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_Address",
        "type": "address"
      }
    ],
    "name": "ExcludeFeeOnTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "TypeOfExclude",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_Address",
        "type": "address"
      }
    ],
    "name": "IncludeFeeOnTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_minter",
        "type": "address"
      }
    ],
    "name": "RemoveMinter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "RescueBnb",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "Amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "Recipient",
        "type": "address"
      }
    ],
    "name": "RescueLossToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_Fee",
        "type": "uint256"
      }
    ],
    "name": "setFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  },
  {
    "inputs": [],
    "name": "_divider",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "FeeOnTransfer",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isexcludedfrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isexcludedto",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "Minter",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
var lnftabi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "Updater",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "TokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "UpdateDate",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "PreviousIpfs",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "NewIpfs",
				"type": "string"
			}
		],
		"name": "IpfsUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "Burner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "TokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "BurnDate",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "bool",
				"name": "IsOwnerBurned",
				"type": "bool"
			}
		],
		"name": "NftBurned",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "Minter",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "TokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "MintDate",
				"type": "uint256"
			}
		],
		"name": "NftMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "TokenId",
				"type": "uint256"
			}
		],
		"name": "BurnNft",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "TokenId",
				"type": "uint256"
			}
		],
		"name": "BurnNftByOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "To",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "TokenId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "IpfsInfo",
				"type": "string"
			}
		],
		"name": "MintNft",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "NewBaseUrI",
				"type": "string"
			}
		],
		"name": "UpdateBaseUrI",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "TokenId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "NewIpfsInfo",
				"type": "string"
			}
		],
		"name": "UpdateIpfsInfo",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
var lstoreabi=[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "TokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "TokenPrice",
				"type": "uint256"
			}
		],
		"name": "AddItem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ItemId",
				"type": "uint256"
			}
		],
		"name": "BuyNft",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "ItemId",
				"type": "uint256"
			}
		],
		"name": "DeleteItem",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "ItemId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "TokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "TokenPrice",
				"type": "uint256"
			}
		],
		"name": "NewItem",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ItemId",
				"type": "uint256"
			}
		],
		"name": "RemoveItem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "TokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "To",
				"type": "address"
			}
		],
		"name": "RescueBep20",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC721",
				"name": "NftContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "TokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "To",
				"type": "address"
			}
		],
		"name": "RescueErc721",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "LcatAddress",
				"type": "address"
			}
		],
		"name": "setLcatAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC721",
				"name": "LnftAddress",
				"type": "address"
			}
		],
		"name": "SetLnftAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "TokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "SellPrice",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "Customer",
				"type": "address"
			}
		],
		"name": "TokenSold",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Items",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ItemId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "TokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "SellPrice",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "Issold",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Lcat",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Lnft",
		"outputs": [
			{
				"internalType": "contract IERC721",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "NftToItemId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TotalItems",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
var Llotteryabi=[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "Round",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "Winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Amount",
				"type": "uint256"
			}
		],
		"name": "DrawCompeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "RoundId",
				"type": "uint256"
			}
		],
		"name": "Draw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Lcat",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Lottery",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "round",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Starttime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "EndTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Drawtime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "TotalTicket",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "TicketPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "PlatformRewardShare",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "UserRewardShare",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "Iscompeleted",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "winner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "TicketPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "EndTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "DrawTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Userrewardshare",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "PlatformRewardShare",
				"type": "uint256"
			}
		],
		"name": "NewRound",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Amount",
				"type": "uint256"
			}
		],
		"name": "ParticipateLottery",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "RescueBnb",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "Recipient",
				"type": "address"
			}
		],
		"name": "RescueLossToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "RoundCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_TokenAddress",
				"type": "address"
			}
		],
		"name": "SetToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Ticket",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "UserTickets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_UserAddress",
				"type": "address"
			}
		],
		"name": "UserTotalTickets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];
var lastnftinfo;
var lastlotterytime;
var lnftcontract="0x8bc6bB71e93FBC2f6B8D6Ca583c0d6289CEd0BB5";
var tokencontract="0xC7772B954E9F1Be990a0231287a85959FC72b771";
var Lstorecontract="0xc860F3fd2ef97Aa18EC44d06Ce1562e5B48AfD2f";
var Llotterycontract="0xF3F14E091D852864ACaCA97A2fa6661A209eB513";
function secsToTime(secs) {
    let d = secs / 8.64e4 | 0;
    let H = (secs % 8.64e4) / 3.6e3 | 0;
    let m = (secs % 3.6e3)  / 60 | 0;
    let s = secs % 60;
    let z = n=> (n < 10? '0' : '') + n;
    return `${d}:${z(H)}:${z(m)}:${z(s)}`
  }
  function LotteryCountr(){
	  lastlotterytime=lastlotterytime-1;
	  document.getElementById('lotterytime').innerHTML=secsToTime(lastlotterytime);
  }
async function fetchlotteryinfo(){
  const w3=new Web3('https://rinkeby.infura.io/v3/ee3cd30dc6ea4f86a6b44bc008a1a27b');
  var Llottery=await new w3.eth.Contract(Llotteryabi,Llotterycontract).methods;
  var RoundNumber=await Llottery.RoundCount().call();
  var Roundinfo=await Llottery.Lottery(RoundNumber).call();
  var TotalTickets=Roundinfo['4'];
  var TicketPrice=Roundinfo['5'];
  var RemainedTime=Roundinfo[2]-(Date.now()/1000|0);
  var LotteryWinner=Roundinfo['9'];
  var UserTotalTicket;
  if(provider==null){
	  UserTotalTicket='0';
  }
  else{
	  UserTotalTicket=await Llottery.UserTotalTickets(myaddress).call();
  }
  if(LotteryWinner=='0x0000000000000000000000000000000000000000'){
	LotteryWinner="Lottery Ongoing..."
  }
  if(RemainedTime<=0){
	  RemainedTime=0;
  }
document.getElementById('lotteryround').innerHTML=RoundNumber;
document.getElementById('totaltickets').innerHTML=TotalTickets;
document.getElementById('ticketprice').innerHTML=w3.utils.fromWei(TicketPrice) +" lcat";
document.getElementById('lotterytime').innerHTML=secsToTime(RemainedTime);
document.getElementById('lotterywinner').innerHTML=LotteryWinner.substr(0,4)+"..."+LotteryWinner.substr(38,42);;
document.getElementById('lotterywinner').href="https://rinkeby.etherscan.io/token/"+tokencontract+"?a="+LotteryWinner;
document.getElementById('usertickets').innerHTML=UserTotalTicket+" Tickets";
lastlotterytime=RemainedTime;
document.getElementById('doparticipate').onclick=function(){participateLottery(document.getElementById('participatevalue').value,w3.utils.fromWei(TicketPrice))};


}
async function participateLottery(totalticket,ticketprice){
 try{
	    if(provider==null){
      console.log("no provider for approve")
      doalert("warning","Connect Wallet!")
      
     }
   else{
	if(totalticket>200){
		totalticket=200;
	}
	var Llottery=await new web3.eth.Contract(Llotteryabi,Llotterycontract).methods;
	Tokeninstance=await new web3.eth.Contract(tokenabi,tokencontract).methods;
	var allowance=await Tokeninstance.allowance(myaddress,Llotterycontract).call({from:myaddress});
	var TotalAmount=totalticket*ticketprice;
	if(web3.utils.toWei(TotalAmount.toString())>allowance){
	   approveall(Llotterycontract,web3.utils.toWei(TotalAmount.toString()));
	}
	else{
	  doalert('info','sign tranasction to Buy'+" "+totalticket+" Ticket");
	  await Llottery.ParticipateLottery(web3.utils.toWei(TotalAmount.toString())).send({from:myaddress}).then(function(response){
		  doalert("success",totalticket+" Tickets Purchased.");
	  });
	  
	}
   }

 } finally{}
}
async function fetchAccountData() {
  var ShowBalance = document.getElementsByClassName("btnss1");
  var ShowAddress =document.getElementsByClassName("btnss2");
  if(provider==null){
   ShowBalance[0].innerHTML=0+"Lcat";
   ShowAddress[0].innerHTML="Connect"
  }
  else{
  
  
  // Get a Web3 instance for the wallet
  web3 = new Web3(provider);
  Tokeninstance=new web3.eth.Contract(tokenabi,tokencontract).methods;
  Lnftinstance=new web3.eth.Contract(lnftabi,lnftcontract).methods;
  Lstoreinstance=new web3.eth.Contract(lstoreabi,Lstorecontract).methods;
  console.log("Web3 instance is", web3);

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();
  // Load chain information over an HTTP API
 
  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  console.log("Got accounts", accounts);
  var selectedAccount = accounts[0];
  myaddress=selectedAccount;
  ShowAddress[0].innerHTML=selectedAccount.substr(0,4)+"..."+selectedAccount.substr(38,42);
  // Go through all accounts and get their ETH balance
  const rowResolvers = accounts.map(async (address) => {
    const balance = await web3.eth.getBalance(address);
    const ethBalance = web3.utils.fromWei(balance, "ether");
    const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
    const balanceoftoken=await Tokeninstance.balanceOf(myaddress).call();
    const tokenBalance =await web3.utils.fromWei(balanceoftoken, "ether");
    const humanFriendlyBalancetoken =await parseFloat(tokenBalance).toFixed(2);
    ShowBalance[0].innerHTML=humanFriendlyBalancetoken+"Lcat";
    // Fill in the templated row and put in the document
  })};
}
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: {
        1: "https://data-seed-prebsc-1-s1.binance.org:8545",
        3: "https://data-seed-prebsc-1-s1.binance.org",
        100: "https://data-seed-prebsc-1-s1.binance.org",
        // ...
      }
    }
  }
  ,  torus: {
    package: Torus, // required
    options: {
      networkParams: {
        host: "https://bsc-dataseed.binance.org/", // optional
        chainId: 56, // optional
        networkId: 1337 // optional
      },
      config: {
        buildEnv: "development" // optional
      }
    }
  }
};

const web3Modal = new Web3Modal({
   disableInjectedProvider: false ,
  cacheProvider: true, // optional
  theme: {
    background: "rgb(39, 49, 56)",
    main: "rgb(199, 199, 199)",
    secondary: "rgb(136, 136, 136)",
    border: "rgba(195, 195, 195, 0.14)",
    hover: "rgb(16, 26, 32)"
  },
  providerOptions // required
});
//var provider;
async function DisconnectWallet(){
  if(provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
     fetchAccountData();
  }

}
async function ConnectWallet() {
  try {
   if(provider==null){
    provider = await web3Modal.connect();
    doalert('success',"Wallet Connected Successfully")
    fetchAccountData();
    provider.on("accountsChanged", (accounts) => {
      fetchAccountData();
    });
  
    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      fetchAccountData();
    });
  
    // Subscribe to networkId change
    provider.on("networkChanged", (networkId) => {
      fetchAccountData();
    });
   }
    else{
      DisconnectWallet();
    }
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }}
  var priceinfo=[];
  var idinfo=[];
  async function LoadNft(){
   // var priceinfo=[];
    //var idinfo=[];
    const w3=new Web3('https://rinkeby.infura.io/v3/ee3cd30dc6ea4f86a6b44bc008a1a27b');
    Lstoreinstance=new w3.eth.Contract(lstoreabi,Lstorecontract).methods;
   var totalitems=await Lstoreinstance.TotalItems().call();
   var i;
   for (i = 0; i < totalitems; i++) {
    
    var Item=await new w3.eth.Contract(lstoreabi,Lstorecontract).methods.Items(totalitems-1-i).call();
    console.log(Item[1]);
    if(Item[3]==false){
      await Getnftinfo(Item[1]);
       await LoadNftPlans(Item[1],Item[2]);
       //document.getElementsByClassName("nft"+Item[1])[0].onclick=function(){alert(Item[2])};
        //document.getElementsByClassName('nft'+Item[1])[0].children[3].children[1].children[0].onclick=function(){alert(Item[2])};
       //document.getElementsByClassName('nft'+Item[1])[0].onclick=function(){alert(Item[2])};//
      priceinfo.push(Item[2]);idinfo.push(Item[1]);
    }
  }
  await setinfo();
  }
  async function setinfo(){
    const w3=new Web3('https://rinkeby.infura.io/v3/ee3cd30dc6ea4f86a6b44bc008a1a27b');
    Lstoreinstance=new w3.eth.Contract(lstoreabi,Lstorecontract).methods;
    var totalnft=idinfo.length;
    var i=0;
    Lnftinstance=await new w3.eth.Contract(lstoreabi,Lstorecontract).methods;
    for(i=0;i<totalnft;i++){
      let input=i;
      var getitemid=await Lnftinstance.NftToItemId(idinfo[i]).call({from:myaddress});
      document.getElementsByClassName("nft"+idinfo[i])[0].addEventListener("click", function() {approve(priceinfo[`${input}`])});
      document.getElementsByClassName("buynft"+idinfo[i])[0].addEventListener("click", function() {Buynft(`${getitemid}`,priceinfo[`${input}`])});
      console.log(`${input}`,priceinfo[`${input}`],"hi iam res");
    }
  }
  function doalert(type,message){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-start',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: type,
        title: message
      })
    
  }
async function Getnftinfo(tokenid){
  const request = new XMLHttpRequest();
  const w3=new Web3('https://rinkeby.infura.io/v3/ee3cd30dc6ea4f86a6b44bc008a1a27b'); 
  var metadata=await new w3.eth.Contract(lnftabi,lnftcontract).methods.tokenURI(tokenid).call();
  var result;
request.open('GET', metadata); 
request.send();
 
request.onload = () => { 
  if (request.status === 200) { 
    console.log("Success"); // So extract data from json and create table 
     
    //Extracting data 
    var name = JSON.parse(request.response).name; 
    var description = JSON.parse(request.response).description; 
    var externalurl= JSON.parse(request.response).external_url; ;
    var image= JSON.parse(request.response).image; 
  console.log(name);
  console.log(description);
  console.log(externalurl);
  console.log(image);
  result=new Object();
  result[0]=name;
  result[1]=description;
  result[2]=externalurl;
  result[3]=image;
  console.log(result);
  lastnftinfo=result;
  return result;
  
  }  
 
}; 
 
request.onerror = () => { 
  console.log("error is happend to load nft metadata from ipfs"); 
}; 
}
async function approve(amount){
try{
  if(provider==null){
   console.log("no provider for approve")
   doalert("warning","Connect Wallet!")
   
  }
  else{
    Tokeninstance=new web3.eth.Contract(tokenabi,tokencontract).methods;
    doalert("info","Sign Transaction For Approving "+web3.utils.fromWei(amount)+" Lcat.")
    Tokeninstance.approve(Lstorecontract,amount).send({from:myaddress}).then(function(response){
      console.log("approve completed");
      doalert("success",web3.utils.fromWei(amount)+" Lcat"+" Approved.");
    });
  
}
}
finally{}
}
async function approveall(contract,amount){
  try{
    if(provider==null){
     console.log("no provider for approve")
     doalert("warning","Connect Wallet!")
     
    }
    else{
      Tokeninstance=new web3.eth.Contract(tokenabi,tokencontract).methods;
      doalert("info","Sign Transaction For Approving "+web3.utils.fromWei(amount)+" Lcat.")
      Tokeninstance.approve(contract,amount).send({from:myaddress}).then(function(response){
        console.log("approve completed");
        doalert("success",web3.utils.fromWei(amount)+" Lcat"+" Approved.");
      });
    
  }
  }
  finally{}
  }
async function Buynft(itemid,nftprice){
  try{
    if(provider==null){
      console.log("no provider for approve")
      doalert("warning","Connect Wallet!")
      
     }
     else{
       doalert('info','sign transaction to purchase nft')
       Tokeninstance=await new web3.eth.Contract(tokenabi,tokencontract).methods;
       Lnftinstance=await new web3.eth.Contract(lstoreabi,Lstorecontract).methods;
       var allowance=await Tokeninstance.allowance(myaddress,Lstorecontract).call({from:myaddress});
      if(allowance<nftprice){
        approve(nftprice);
      }
      else{
         await Lnftinstance.BuyNft(itemid).send({from:myaddress}).then(function(response){
          doalert("success","Nft Purchase Completed.");
         });
      }
     }
  } catch(error){
    doalert("error","Nft Purchanse Faild.");
  }
}
const w3=new Web3('https://rinkeby.infura.io/v3/ee3cd30dc6ea4f86a6b44bc008a1a27b'); 
var totaladd=0;
async function LoadNftPlans(tokenid,tokenprice){
  await Getnftinfo(tokenid);
  var clone=await document.getElementById('NftPlans');
  var itemclone= clone.cloneNode(true);
  if(totaladd==0){
    await document.getElementById('NftPlans').remove();
  }
  document.getElementById('NftContainer').appendChild(itemclone);
  document.getElementById('NftPlans').children[0].innerHTML=lastnftinfo[0]+"("+tokenid+")";
  document.getElementById('NftPlans').children[1].src=lastnftinfo[3];
  document.getElementById('NftPlans').children[2].innerHTML=lastnftinfo[1];
  document.getElementById('totalprice').innerHTML=w3.utils.fromWei(tokenprice)+"Lcat";
  //document.getElementById('approvefornft').onclick=function(){console.log(tokenprice)};
  var forapprove=document.getElementById('approvefornft');
  forapprove.className="btn buy-btn-1"+" "+"approve-btn"+" "+"btn"+" "+"nft"+tokenid;
  var ibuynft=document.getElementById('lnftbuy');
  ibuynft.className="btn buy-btn-2"+" "+"buynft"+tokenid;
  console.log(tokenid+"hahaha"+tokenprice);
  console.log(totaladd+"inforound");
  totaladd++;
}
function comingsoon(){
	doalert('info',"coming soon...")
}
function App() {
  return (

    <div className="App">
             <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"/>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=B612&display=swap" rel="stylesheet"/>
      <header className="App-header">
      <section className="section">
          <div className="container">
            <div id="header">
              <div className="logo">
                <img src={logo} alt="" />
                <span>Lolcat Platform</span>
              </div>
              <span id="btnss">
                <button className="btn btnss1">balance:0Lcat</button>
                <button className="btn btnss2" id="btn-connect">Connect</button>
                <button className="btn btnss1" id="btn-test1">test fetch</button>
                <button className="btn btnss3" id="btn-test"  >test</button>
              </span>
            </div>
          </div>
          {/* main */}
          <section>
            <div className="container">
              {/*  main section */}
              <div id="main_section">
                <div className="main_description">
                  <div>
                    <h1 className="big-title">Lolcat Meme And Nft Gaming Platform <br /><br /></h1>
                    <p className="small-subtitle">Lolcat Is Nft Gaming Platform with liquidity Based Supply token Let User To Buy And  Level Up their Nft Power And Win Agains Another Nfts</p>
                  </div>
                </div>
                <div className="big_logo">
                  <img src={logo} alt="" />
                </div>
              </div>
              {/* buy token */}
              <div className="buy-token">
                <h2>BUY TOKEN</h2>
                <span className="line-token" />
                <div className="buy-token-button">

                  <button className="btn" onClick={comingsoon}>Buy At PancakeSwap</button>
                  <button className="btn" onClick={comingsoon}>Buy At JulSwap</button>
                  <button className="btn" onClick={comingsoon}>Buy At BakerySwap</button>
                </div>
              </div>
              <div className="line-between" />
              {/* nft plan */}
              <div class="nft-plan">
                <h2>BUY LOL NFT AND <span class="next-line">GROW WITH US</span></h2>
               
                  <div class="nft-info-plan " id="NftContainer">
             
               
                </div>
            </div>
              <div className="line-between" />
              {/* lottery */}
              <div className="main-lottery">
                <h2>LOTTERY</h2>
                <div className="all-lottery-item">
                  <div className="lottery-item">
                    <div className="pool-info">
                      <span style={{fontWeight: 900, marginBottom: '0.4rem'}}>participate:</span>
                    </div>
                    <div className="pool-info">
                      <span>lottery round:</span>
                      <span id="lotteryround">xxxxxxxxxxxx</span>
                    </div>
                    <div className="pool-info">
                      <span >total tickets:</span>
                      <span id="totaltickets">xxxx</span>
                    </div>
                    <div className="pool-info">
                      <span>ticket price:</span>
                      <span id="ticketprice">xxxx</span>
                    </div>
                    <div className="pool-info">
                      <span >my tickets:</span>
                      <span id="usertickets">xxxx</span>
                    </div>
                    <div className="pool-info">
                      <span>remained time:</span>
                      <span id="lotterytime">xx:xx:xx</span>
                    </div>
                    <div className="pool-info">
                      <span>last lottery winner:</span>
                      <a id='lotterywinner'>000,000,000</a>
                    </div>

                    <div className="unstake-div">
                      <span className="earn-ltoken">lcat to participate</span>
                      <div className="unstake-button">
                        <span><input type="text" placeholder={100} id="participatevalue" /></span>
                        <button className="btn none-border2" id="doparticipate">participate</button>
                      </div>
                    </div>
                  </div>
                  <div className="lottery-items">
                    <img style={{width: '100%', height: '100%', borderRadius: '5px'}} src={lotteryimage} alt="" />
                  </div>
                  <div className="lottery-item lottery-item3">
                    <div className="pool-info">
                      <span>Meow Meow Lets Try Lcat Token Lottery And Try Our Chance To Win Huge Amount Of Lcat Every Ticket Cost Randomly Every Round Between 1 to 10 Lcat And Total Reward Is 60 Percent of Total Ticket And Remained Percent Will Be Used For Token Burning And Tresury Fund </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="line-between" />
              {/* fixed apy stake */}
             </div>
          </section>
        </section>
        <section style={{background: '#282B35'}}>
          <div className="container">
            <footer>
              <div className="footer">
                <span>
                  <a href="#"><img src={twitter} alt="" /></a>
                  <a href="#"><img src={telegram} alt="" /></a>
                  <a href="#"><img src={github} alt="" /></a>
                  <a href="#"><img src={medium} alt="" /></a>
                </span>
                <h5>designed with love by ltoken team and community</h5>
              </div>
            </footer>
          </div>
      
        </section>
        <div>
        <div class="nft-item" id="NftPlans">
                        <h3>NFT Names</h3>
                        <img src="img/nft3.jpg" alt=""/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad at aut commodi doloremque,
                            doloribus eaque eius eum eveniet excepturi exercitationem inventore, laborum nobis non
                            nostrum perferendis quae quia ut voluptates.</p>
                        <div class="approved-nft">
                            <div class="amount-of-ltoken">
                                <div class="nft-line"></div>
                                <h5 id="totalprice">300 ltoken</h5>
                            </div>
                            <div class="buy-button">
                                <button class="btn approve-btn" id="approvefornft">approve</button>
                                <button class="btn buy-btn-2" id="lnftbuy">buy</button>
                            </div>
                        </div>
                    </div>
        </div>

      </header>

    </div>
  );
}
window.addEventListener('load', async () => {
  fetchAccountData();
  LoadNft();
   setInterval(() => {
	  LotteryCountr()
   }, 1000);
  await fetchlotteryinfo();
  document.querySelector("#btn-connect").addEventListener("click", ConnectWallet);
  document.querySelector("#btn-test1").addEventListener("click",()=>Buynft('0','100000000000000000000000000000000000000000000000000000000000000'));
  document.querySelector("#btn-test").addEventListener("click",()=>participateLottery('10','10'));
  //document.querySelector("#btn-test").addEventListener("click",LoadNft);
});
export default App;
