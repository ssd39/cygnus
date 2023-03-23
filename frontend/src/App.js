import { useEffect, useState } from "react";
import { Signer } from "@waves/signer";
import { ProviderKeeper } from "@waves/provider-keeper";

function App() {
  const signer = new Signer({
    // Specify URL of the node on Testnet
    NODE_URL: "https://nodes-testnet.wavesnodes.com",
  });
  const keeper = new ProviderKeeper();
  signer.setProvider(keeper);

  const serverUrl =
    "https://nodes-testnet.wavesnodes.com/addresses/data/3N2iycpXC7Fomf1vYLmz9uUWwLR2ZvxRCyw";
  const [connected, setConnected] = useState(false);

  const setAurues = async () => {
    await signer.login();
    const balances = await signer.getBalance();
    let balance = 0;
    for (var i = 0; i < balances.length; i++) {
      if (
        balances[i]["assetId"] == "4sUGAwEDLVm6Z3sNbLapWXtEtMkhRU8fypam9dLT4UjM"
      ) {
        balance = balances[i]["amount"];
      }
    }

    window.aureus = Number(balance.toString()) / 100;
    console.log("aureus done");
  };

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  window.fetchWar = async () => {
    let userData = await (await fetch(`${serverUrl}?key=userId`)).json();
    let num = randomIntFromInterval(0, userData[0]["value"]);
    num = num.toString();
    let useradd = await (await fetch(`${serverUrl}?key=${num}`)).json();
    useradd = useradd[0]["value"];
    window.opponent = useradd;
    let userbase = await (
      await fetch(`${serverUrl}?key=${useradd}_data`)
    ).json();
    userbase = userbase[0]["value"];
    let datas = JSON.parse(userbase.replaceAll("'", '"'));
    datas["address"] = "";
    window.myGameInstance.SendMessage(
      "WarManager",
      "onWarData",
      JSON.stringify(datas)
    );
  };

  window.openMarketPlace = () => {
    window.open("https://waves-marketplace-three.vercel.app/");
  };

  window.collectwin = async (troopsDeadCnt, buildingamount, troopsamount) => {
    await signer
      .invoke({
        dApp: "3N2iycpXC7Fomf1vYLmz9uUWwLR2ZvxRCyw",
        fee: 1000000,
        call: {
          function: "rewardWar",
          args: [
            { type: "integer", value: buildingamount },
            { type: "integer", value: troopsDeadCnt },
            { type: "string", value: window.opponent },
          ],
        },
      })
      .broadcast();

    window.myGameInstance.SendMessage("Button_AD", "showData");
  };

  window.savegame = async (str) => {
    try {
      await signer
        .invoke({
          dApp: "3N2iycpXC7Fomf1vYLmz9uUWwLR2ZvxRCyw",
          fee: 1000000,
          call: {
            function: "saveGame",
            args: [{ type: "string", value: str.replaceAll('"', "'") }],
          },
        })
        .broadcast();
    } catch (e) {
      console.error(e);
    }
    window.myGameInstance.SendMessage("syncButton", "onSave");
  };

  window.userdata = async () => {
    let miner = await (
      await fetch(`${serverUrl}?key=${window.accountId}_miner`)
    ).json();
    if (miner.toString() == "") {
      window["miner"] = 0;
    } else {
      window["miner"] = miner[0]["value"];
    }
    let townhall = await (
      await fetch(`${serverUrl}?key=${window.accountId}_townhall`)
    ).json();
    if (miner.toString() == "") {
      window["townhall"] = 0;
    } else {
      window["townhall"] = townhall[0]["value"];
    }
    let tesla = await (
      await fetch(`${serverUrl}?key=${window.accountId}_tesla`)
    ).json();
    if (miner.toString() == "") {
      window["tesla"] = 0;
    } else {
      window["tesla"] = tesla[0]["value"];
    }
    let cannon = await (
      await fetch(`${serverUrl}?key=${window.accountId}_canon`)
    ).json();
    if (miner.toString() == "") {
      window["cannon"] = 0;
    } else {
      window["cannon"] = cannon[0]["value"];
    }
    let xbow = await (
      await fetch(`${serverUrl}?key=${window.accountId}_xbow`)
    ).json();
    if (miner.toString() == "") {
      window["xbow"] = 0;
    } else {
      window["xbow"] = xbow[0]["value"];
    }
    let archer = await (
      await fetch(`${serverUrl}?key=${window.accountId}_archer`)
    ).json();
    if (miner.toString() == "") {
      window["archer"] = 0;
    } else {
      window["archer"] = archer[0]["value"];
    }
    let valkyriee = await (
      await fetch(`${serverUrl}?key=${window.accountId}_valkyriee`)
    ).json();
    if (miner.toString() == "") {
      window["valkyriee"] = 0;
    } else {
      window["valkyriee"] = valkyriee[0]["value"];
    }
    let robot = await (
      await fetch(`${serverUrl}?key=${window.accountId}_robo`)
    ).json();
    if (miner.toString() == "") {
      window["robot"] = 0;
    } else {
      window["robot"] = robot[0]["value"];
    }

    await setAurues();

    window.myGameInstance.SendMessage("RTS_Camera", "onDone");
  };

  window.connect = async function () {
    const { address, publicKey } = await signer.login();
    window.accountId = address;
    window.publicKey = publicKey;
    setConnected(true);
  };

  const checkUser = async () => {
    try {
      let assetsData = await await (
        await fetch(`${serverUrl}?key=${window.accountId}_isStrted`)
      ).json();
      window.assetsData = assetsData;

      if (assetsData.toString() == "") {
        console.log("atleast here");
        // mint townhall
        await signer
          .invoke({
            dApp: "3N2iycpXC7Fomf1vYLmz9uUWwLR2ZvxRCyw",
            fee: 1000000,
            call: {
              function: "startGame",
              args: [],
            },
          })
          .broadcast();
      }

      let b_data = await (
        await fetch(`${serverUrl}?key=${window.accountId}_data`)
      ).json();
      if (b_data.toString() == "") {
        window.building_data = JSON.stringify({ address: "", buil: [] });
      } else {
        console.log(b_data);

        let datas = JSON.parse(b_data[0]["value"].replaceAll("'", '"'));
        datas["address"] = "";
        window.building_data = JSON.stringify(datas);
      }
      console.log("i am hereee");
      window.userdata();
    } catch (e) {
      console.error(e);
      alert("Error while fetching user!");
    }
  };

  useEffect(() => {
    if (window.publicKey) {
      window.myGameInstance.SendMessage("RTS_Camera", "onConnect");
      checkUser();
    }
  }, [connected]);

  useEffect(() => {
    window.loadUnity();
  }, []);

  return (
    <div id="unity-container" className="unity-desktop">
      <canvas id="unity-canvas"> </canvas>{" "}
      <div id="unity-loading-bar">
        <div id="unity-logo"> </div>{" "}
        <div id="unity-progress-bar-empty">
          <div id="unity-progress-bar-full"> </div>{" "}
        </div>{" "}
      </div>{" "}
      <div id="unity-mobile-warning">
        WebGL builds are not supported on mobile devices.{" "}
      </div>{" "}
    </div>
  );
}

export default App;
