import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";

import DownArrow from "../assets/down-arrow.svg";
import UpArrow from "../assets/up-arrow.svg";
import OpenNew from "../assets/open_new.svg";

export default function ProfileScreen({
  ethereumBalance,
  nonFun,
  list,
  txnHash,
}) {
  const [selectedID, setSelectedID] = useState("");
  const uri = "https://ropsten.etherscan.io/tx/";

  return (
    <div className="container">
      <div className="page-header">
        <div className="page-title">Profile</div>
      </div>
      <div className="row row-cards">
        <div className="col-md-3">
          <div className="card p-3 px-4">
            <div>
              <i className="fab fa-ethereum text-white m-1"></i>
              <span className="text-white">Ethereum Balance</span>
            </div>
            <div className="py-4 m-0 text-center text-white h1">
              {ethereumBalance} ETH
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title text-white">Your Patents</h3>
            </div>
            <div className="table-responsive pb-0">
              <table className="table card-table table-vcenter text-nowrap">
                <thead>
                  <tr>
                    <th className="w-1 text-white">Id</th>
                    <th className="text-white h1">Token Name</th>
                    <th className="text-white">Patent Name</th>
                    <th className="text-white">Patent ID</th>
                  </tr>
                </thead>
              </table>
              <Accordion className="accordion-dropdown">
                {list.map((data, index) => {
                  const tokenName = JSON.parse(data).name;
                  const tokenDesc = JSON.parse(data).description;
                  const tokenId = JSON.parse(data).id;
                  return (
                    <Card key={index}>
                      <Card.Header>
                        <Accordion.Toggle
                          className="d-flex align-items-center w-100 border-0 p-0"
                          variant="link"
                          eventKey={tokenName}
                          onClick={() =>
                            setSelectedID(
                              selectedID === tokenName ? "" : tokenName
                            )
                          }
                        >
                          <p>
                            <span className="text-muted text-white">
                              {index + 1}
                            </span>
                          </p>
                          <p className="text-white">{nonFun.name}</p>
                          <p className="text-white">
                            {tokenName} ({nonFun.symbol})
                          </p>
                          <div className="patent-id d-flex justify-content-between">
                            <span className="text-white">{tokenId}</span>
                            <img
                              src={
                                tokenName === selectedID ? DownArrow : UpArrow
                              }
                              alt="down"
                            />
                          </div>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={tokenName}>
                        <Card.Body>
                          <label className="text-white">Patent Name : </label>
                          <span className="text-white"> {tokenName}</span>
                          <br />
                          <label className="text-white">
                            Patent Description :
                          </label>
                          <span className="text-white">{tokenDesc}</span>
                          <br />
                          <div
                            className="cursor-pointer"
                            onClick={() =>
                              window.open(`${uri}${txnHash[index]}`, "_blank")
                            }
                          >
                            <img src={OpenNew} className="open-new" alt="" />
                            {"   "}
                            <span className="text-white">
                              View on Ethereum scan.io
                            </span>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
