import styles from "../styles/Home.module.css";
import { useState } from "react";
import { RingLoader } from "react-spinners";
import dynamic from "next/dynamic";
import NFTCard from "./NFTcard";
import { Signer } from "@waves/signer";
import { ProviderKeeper } from "@waves/provider-keeper";

const signer = new Signer({
  // Specify URL of the node on Testnet
  NODE_URL: "https://nodes-testnet.wavesnodes.com",
});
const keeper = new ProviderKeeper();
signer.setProvider(keeper);
const GLBViewer = dynamic(() => import("./Glbviewer"), { ssr: false });

export const MintNFTs = () => {
  const [nft, setNft] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [disableMint, setDisableMint] = useState(false);
  const mapping = {
    xbow: {
      id: 2,
      src: "./xbow.glb",
      price: "150",
      currency: "Aureus",
      candymachine: "3N2iycpXC7Fomf1vYLmz9uUWwLR2ZvxRCyw",
    },
    townhall: {
      id: 4,
      src: "./townhall.glb",
      price: "Nan",
      currency: "Aureues",
      candymachine: "3N2iycpXC7Fomf1vYLmz9uUWwLR2ZvxRCyw",
    },
    miner: {
      id: 0,
      src: "./miner.glb",
      price: "300",
      currency: "Aureus",
      candymachine: "3N2iycpXC7Fomf1vYLmz9uUWwLR2ZvxRCyw",
    },
    tesla: {
      id: 3,
      src: "./tesla.glb",
      price: "200",
      currency: "Aureus",
      candymachine: "3N2iycpXC7Fomf1vYLmz9uUWwLR2ZvxRCyw",
    },
    cannon: {
      id: 1,
      src: "./cannon.glb",
      price: "250",
      currency: "Aureus",
      candymachine: "3N2iycpXC7Fomf1vYLmz9uUWwLR2ZvxRCyw",
    },
    archer: {
      id: 5,
      src: "./archer.glb",
      price: "45",
      currency: "Aureus",
      candymachine: "3N2iycpXC7Fomf1vYLmz9uUWwLR2ZvxRCyw",
    },
    robot: {
      id: 6,
      src: "./robot.glb",
      price: "55",
      currency: "Aurues",
      candymachine: "3N2iycpXC7Fomf1vYLmz9uUWwLR2ZvxRCyw",
    },
    valkyrie: {
      id: 7,
      src: "./valkyrie.glb",
      price: "60",
      currency: "Aureus",
      candymachine: "3N2iycpXC7Fomf1vYLmz9uUWwLR2ZvxRCyw",
    },
  };

  let walletBalance;
  const [selectedValue, setSelectedValue] = useState("xbow");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // show and do nothing if no wallet is connected

  const onClick = async () => {
    setIsLoading(true);

    const { address, publicKey } = await signer.login();
    try {
      await signer
        .invoke({
          dApp: "3N2iycpXC7Fomf1vYLmz9uUWwLR2ZvxRCyw",
          payment: [
            {
              assetId: "4sUGAwEDLVm6Z3sNbLapWXtEtMkhRU8fypam9dLT4UjM",
              amount: mapping[selectedValue].price * 100,
            },
          ],
          call: {
            function: "buy",
            args: [{ type: "integer", value: mapping[selectedValue].id }],
          },
        })
        .broadcast();
    } catch (err) {
      console.log(err);
      alert("Transaction failed");
    }

    setIsLoading(false);
    alert("NFT minted Successfully");
    setNft(nft);
  };

  return (
    <div className={styles.separator}>
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginRight: "10px",
            width: "150%",
          }}
        >
          <label>
            <input
              type="radio"
              value="xbow"
              checked={selectedValue === "xbow"}
              onChange={handleRadioChange}
            />{" "}
            <div
              style={{
                padding: "5px",
                fontSize: 22,
                color: "whitesmoke",
                fontWeight: "bold",
              }}
              e
            >
              Xbow{" "}
            </div>{" "}
          </label>{" "}
          <label>
            <input
              type="radio"
              value="tesla"
              checked={selectedValue === "tesla"}
              onChange={handleRadioChange}
            />{" "}
            <div
              style={{
                padding: "5px",
                fontSize: 22,
                color: "whitesmoke",
                fontWeight: "bold",
              }}
              e
            >
              Tesla{" "}
            </div>{" "}
          </label>{" "}
          <label>
            <input
              type="radio"
              value="cannon"
              checked={selectedValue === "cannon"}
              onChange={handleRadioChange}
            />{" "}
            <div
              style={{
                padding: "5px",
                fontSize: 22,
                color: "whitesmoke",
                fontWeight: "bold",
              }}
              e
            >
              Canon{" "}
            </div>{" "}
          </label>{" "}
          <label>
            <input
              type="radio"
              value="valkyrie"
              checked={selectedValue === "valkyrie"}
              onChange={handleRadioChange}
            />{" "}
            <div
              style={{
                padding: "5px",
                fontSize: 22,
                color: "whitesmoke",
                fontWeight: "bold",
              }}
              e
            >
              Valkyrie{" "}
            </div>{" "}
          </label>{" "}
          <label>
            <input
              type="radio"
              value="robot"
              checked={selectedValue === "robot"}
              onChange={handleRadioChange}
            />{" "}
            <div
              style={{
                padding: "5px",
                fontSize: 22,
                color: "whitesmoke",
                fontWeight: "bold",
              }}
              e
            >
              Robot{" "}
            </div>{" "}
          </label>{" "}
          <label>
            <input
              type="radio"
              value="archer"
              checked={selectedValue === "archer"}
              onChange={handleRadioChange}
            />{" "}
            <div
              style={{
                padding: "5px",
                fontSize: 22,
                color: "whitesmoke",
                fontWeight: "bold",
              }}
              e
            >
              Archer{" "}
            </div>{" "}
          </label>{" "}
          <label>
            <input
              type="radio"
              value="miner"
              checked={selectedValue === "miner"}
              onChange={handleRadioChange}
            />{" "}
            <div
              style={{
                padding: "5px",
                fontSize: 22,
                color: "whitesmoke",
                fontWeight: "bold",
              }}
              e
            >
              Miner{" "}
            </div>{" "}
          </label>{" "}
          <label>
            <input
              type="radio"
              value="townhall"
              checked={selectedValue === "townhall"}
              onChange={handleRadioChange}
              style={{ backgroundColor: "black" }}
            />{" "}
            <div
              style={{
                padding: "5px",
                fontSize: 22,
                color: "whitesmoke",
                fontWeight: "bold",
              }}
            >
              Townhall{" "}
            </div>{" "}
          </label>{" "}
        </div>{" "}
        <div style={{ display: "flex", marginTop: 25 }}>
          <div>
            <GLBViewer src={mapping[selectedValue].src} />{" "}
          </div>{" "}
          <div>
            <div className={styles.container}>
              <div className={styles.nftForm}> </div>{" "}
            </div>{" "}
            <div className={styles.nftcontainer}>
              <NFTCard
                name={selectedValue}
                price={Number(mapping[selectedValue].price)}
                currency={mapping[selectedValue].currency}
              />{" "}
            </div>{" "}
            <button
              className={styles.nftcardbutton}
              onClick={onClick}
              disabled={disableMint}
              style={{ fontWeight: "bold" }}
            >
              Mint{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <RingLoader
        color={"white"}
        style={{ position: "absolute", left: "45%", top: "45%" }}
        loading={isLoading}
      />{" "}
    </div>
  );
};
