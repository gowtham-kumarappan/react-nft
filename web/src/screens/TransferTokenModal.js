import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { transferPatent } from "../services/transferPatent";
import { sharePatent } from "../services/sharePatent";

export default function TransferPatentModal({
  status,
  data,
  type,
  onCancel,
  fromAddress,
}) {
  const [toAddress, setToAddress] = useState("");
  const [txHash, setTXHash] = useState("");
  const [txData, setTXData] = useState(undefined);
  const [errorData, setErrorData] = useState("");

  const onClose = (data) => {
    onCancel(false);
    setTXData(data);
  };

  const { tokenID, tokenName } = data;

  return (
    <Modal
      show={status}
      onHide={() => onCancel(false)}
      className="fadeInRight animated"
      centered
    >
      <Modal.Body style={{ backgroundColor: "#202020" }}>
        {txData ? (
          <div className="m-4 position-absolute">
            <div className="alert alert-icon alert-success" role="alert">
              <i className="fe fe-check mr-2" aria-hidden="true"></i>
              {txData.status ? "Token Created Successfully" : "Failure"}
            </div>
          </div>
        ) : (
          txHash.length > 0 && (
            <div
              className="alert alert-primary alert-modal d-flex align-items-center p-2"
              role="alert"
              onClick={() =>
                window.open(
                  `https://ropsten.etherscan.io/tx/${txHash}`,
                  "_blank"
                )
              }
            >
              <i className="fe fe-bell mr-2" aria-hidden="true"></i>
              <span> {txHash}</span>
            </div>
          )
        )}
        {errorData ? (
          <div class="alert alert-danger alert-dismissible">
            <button
              type="button"
              onClick={() => setErrorData("")}
              className="close"
              data-dismiss="alert"
            ></button>
            {errorData}
          </div>
        ) : null}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title text-white">Patent ID: {tokenID}</h3>
          </div>
          <div className="card-body text-white">Patent Name: {tokenName}</div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label text-white">
                {type === "transfer" ? "Transfer" : "Share"} Patent To
              </label>
              <div className="input-icon mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={toAddress}
                  disabled={txHash}
                  onChange={(event) => setToAddress(event.target.value)}
                  placeholder="To Address"
                />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            {type === "transfer" ? (
              <button
                type="button"
                className="btn btn-info"
                disabled={txHash}
                onClick={() =>
                  transferPatent(
                    fromAddress,
                    toAddress,
                    tokenID,
                    (data) => {
                      setTXHash(data);
                    },
                    onClose,
                    setErrorData
                  )
                }
              >
                <i className="fa fa-share mr-2"></i>
                Transfer
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-info"
                disabled={txHash}
                onClick={() =>
                  sharePatent(
                    fromAddress,
                    toAddress,
                    tokenID,
                    setTXHash,
                    onClose,
                    setErrorData
                  )
                }
              >
                <i className="fa fa-share-alt mr-2"></i>
                Share
              </button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
