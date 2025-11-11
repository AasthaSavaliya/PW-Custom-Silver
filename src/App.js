import {useEffect, useState} from 'react'
import logo from "./assets/Black-Font.png";
import copy from "./assets/clippy.svg";
import "./App.css";


function App() {
  let initialFormData = {
    silverPrice: 10,
    silverWeight: "",
    roundWeight: "",
    roundPrice: 275,
    moissaniteRdWeight: "",
    moissaniteEmWeight: "",
    roundTotal: 0,
    moissaniteRdPrice: 10,
    silverTotal: 0,
    moissaniteRdTotal: 0,
    moissaniteEmTotal: 0,
    miscTotal: 0,
    miscPrice: 0,
    miscWeight: "",
    totalWithoutRound: 0,
  };

  // Git commit test

  const [formData, setFormData] = useState(initialFormData);

  function handleChange(fieldName, e) {
    setFormData((prevState) => {
      let updatedValues = {
        ...prevState,
        [fieldName]:
          e.target.value[0] === "0"
            ? e.target.value.substring(1)
            : e.target.value,
      };

      updatedValues["silverTotal"] = isNaN(
        parseFloat(updatedValues["silverWeight"])
      )
        ? updatedValues["silverPrice"] * 0
        : updatedValues["silverPrice"] * parseFloat(updatedValues["silverWeight"]);

      updatedValues["moissaniteRdTotal"] = isNaN(
        parseFloat(updatedValues["moissaniteRdWeight"])
      )
        ? updatedValues["moissaniteRdPrice"] * 0
        : updatedValues["moissaniteRdPrice"] *
          parseFloat(updatedValues["moissaniteRdWeight"]);

      updatedValues["moissaniteEmTotal"] = isNaN(
        parseFloat(updatedValues["moissaniteEmWeight"])
      )
        ? updatedValues["moissaniteEmPrice"] * 0
        : updatedValues["moissaniteEmPrice"] *
          parseFloat(updatedValues["moissaniteEmWeight"]);


      updatedValues["miscTotal"] = isNaN(
        parseFloat(updatedValues["miscWeight"])
      )
        ? updatedValues["miscPrice"] * 0
        : updatedValues["miscPrice"] * parseFloat(updatedValues["miscWeight"]);

      updatedValues["roundTotal"] = isNaN(
        parseFloat(updatedValues["roundWeight"])
      )
        ? updatedValues["roundPrice"] * 0
        : updatedValues["roundPrice"] *
          parseFloat(updatedValues["roundWeight"]);

      updatedValues["totalWithoutRound"] =
        updatedValues["silverTotal"] +
        updatedValues["moissaniteRdTotal"] +
        updatedValues["moissaniteEmTotal"] +
        updatedValues["miscTotal"];

      if (e.target.value.length === 0) {
        updatedValues[fieldName] = 0;
      }
      return updatedValues;
    });
  }

  // function clipBoadHandler(e) {
  //   e.preventDefault();
  //   let textToCopy = "";
  //   [275, 300, 350, 400, 450].map((value) => {
  //     textToCopy += `\n$${value} / Ct = ${parseFloat(
  //       Math.ceil(
  //           ((formData["totalWithoutRound"] + formData["roundWeight"] * value) *
  //           1.28)/10
  //       )*10
  //     )}`;
  //   });
  //
  //   navigator.clipboard.writeText(textToCopy);
  // }

  // function clipBoadHandler2(e) {
  //   e.preventDefault();
  //   let textToCopy = "";
  //   [{name:'TTLB',value:275}, {name:'SI',value:300}, {name:'SI/ VS', value:350}, {name:'VS',value:400}, {name:'VS/ VVS', value:450}].map((value) => {
  //     textToCopy += `\n${value.name} = $${parseFloat(
  //       Math.ceil(
  //           ((formData["totalWithoutRound"] + formData["roundWeight"] * `${value.value}`) *
  //           1.28)/10
  //       )*10
  //     )}`;
  //   });
  //
  //   navigator.clipboard.writeText(textToCopy);
  // }

  function clipBoadHandler(e) {
  e.preventDefault();
  let textToCopy = "";
  [275, 300, 350, 400, 450].map((value) => {
    textToCopy += `\n$${value} / Ct = ${parseFloat(
      Math.ceil(
        ((formData["totalWithoutRound"] + formData["roundWeight"] * value) * 1.28) / 10
      ) * 10
    )}`;
  });

  textToCopy += `\n\nIncluding 15% Tariff.`;

  navigator.clipboard.writeText(textToCopy);
}

  function resetForm() {
    const resetData = {
      silverWeight: "",
      roundWeight: "",
      moissaniteRdWeight: "",
      moissaniteEmWeight: "",
      miscWeight: "",
      silverTotal: 0,
      moissaniteRdTotal: 0,
      moissaniteEmTotal: 0,
      miscTotal: 0,
      miscPrice: 0,
      roundTotal: 0,
      roundPrice: 275,
      totalWithoutRound: 0,
    };

    setFormData((prevState) => {
      return { ...prevState, ...resetData };
    });
  }

  useEffect(() => {
   document.title = "PW Custom"
}, []);

  return (
    <>
      <div className="py-4 branding">
        <img
          src={logo}
          alt="Prime Wholesale logo"
          width="170px"
          className="img-responsive center-block d-block mx-auto"
        />
      </div>

      <section className="h-100 p-md-5 p-3">
        <form id={"main-form"}>
          {/* Heading */}
          <h3 className="text-center py-2" style={{ fontFamily: "serif" }}>
            Custom Jewelry Pricing
          </h3>

          {/* SILVER CONTAINER */}
          <div className="gold-containers">
            <div className="d-flex align-items-center mb-3">
              <h4 className="me-2 m-0">Silver</h4>
              <input
                name="silver"
                onChange={handleChange.bind(this, "silverWeight")}
                type="number"
                className="form-control text-center"
                style={{ borderBottom: "1px solid black", borderRadius: 0 }}
                aria-label="Grams"
                value={formData["silverWeight"]}
              />
              <span>Gr.</span>
            </div>

            <div className="input-group mb-3 pe-5">
              <label>$&nbsp;</label>
              <input
                name="silverPrice"
                onChange={handleChange.bind(this, "silverPrice")}
                type="number"
                className="form-control text-center"
                aria-label="Rate"
                value={formData["silverPrice"]}
              />

              {/*<select*/}
              {/*    onChange={handleChange.bind(this, "silverPrice")}*/}
              {/*    name="silverPrices"*/}
              {/*  >*/}
              {/*    <option value={39}>39</option>*/}
              {/*    <option value={40}>40</option>*/}
              {/*  </select>*/}
              <label className={"me-3"}>=</label>
              <label>{formData["silverTotal"].toFixed(2)}</label>
            </div>
          </div>
          {/* SILVER CONTAINER END*/}

          <hr />

          {/* ROUND DIAMOND CONTAINER */}
          <div className="round-diam-container">
            <div className="d-flex align-items-center mb-3">
              <h4 className="me-2 m-0">Round Diamonds</h4>
              <input
                type="number"
                onChange={handleChange.bind(this, "roundWeight")}
                className="form-control text-center"
                aria-label="Grams"
                value={formData["roundWeight"]}
                style={{ borderBottom: "1px solid black", borderRadius: 0 }}
              />
              <span>Ctw.</span>
            </div>
            <div className="input-group mb-3 pe-5">
              <form>
                <select
                  onChange={handleChange.bind(this, "roundPrice")}
                  name="roundPrices"
                >
                  <option value={275}>275</option>
                  <option value={300}>300</option>
                  <option value={350}>350</option>
                  <option value={400}>400</option>
                  <option value={450}>450</option>
                </select>
              </form>
              <label className={"mx-3"}>=</label>

              <label>{formData["roundTotal"].toFixed(2)}</label>
            </div>
          </div>
          {/* ROUND DIAMOND CONTAINER END */}

          <hr />

          {/* MOISSANITE Rd CONTAINER*/}

          <div className="baguette-diam-container">
            <div className="d-flex align-items-center mb-3">
              <h4 className="me-2 m-0">Moissanite Rd.</h4>
              <input
                type="number"
                onChange={handleChange.bind(this, "moissaniteRdWeight")}
                className="form-control text-center"
                value={formData["moissaniteRdWeight"]}
                aria-label="Carat weight"
                style={{ borderBottom: "1px solid black", borderRadius: 0 }}
              />
              <span>Ctw.</span>
            </div>
            <div className="input-group mb-3 pe-5">
              <label>$</label>
              <input
                type="number"
                value={formData["moissaniteRdPrice"]}
                className="form-control text-center"
                aria-label="Rate"
                onChange={handleChange.bind(this, "moissaniteRdPrice")}
              />

              <label className={"me-3"}>=</label>
              <label>{formData["moissaniteRdTotal"].toFixed(2)}</label>
            </div>
          </div>

          {/* MOISSANITE Em CONTAINER*/}

          <div className="baguette-diam-container">
            <div className="d-flex align-items-center mb-3">
              <h4 className="me-2 m-0">Moissanite Em.</h4>
              <input
                type="number"
                onChange={handleChange.bind(this, "moissaniteEmWeight")}
                className="form-control text-center"
                value={formData["moissaniteEmWeight"]}
                aria-label="Carat weight"
                style={{ borderBottom: "1px solid black", borderRadius: 0 }}
              />
              <span>Ctw.</span>
            </div>
            <div className="input-group mb-3 pe-5">
              <label>$</label>
              <input
                type="number"
                value={formData["moissaniteEmPrice"]}
                className="form-control text-center"
                aria-label="Rate"
                onChange={handleChange.bind(this, "moissaniteEmPrice")}
              />

              <label className={"me-3"}>=</label>
              <label>{formData["moissaniteEmTotal"].toFixed(2)}</label>
            </div>
          </div>

          {/*BAGUETTE DIAMOND CONTAINER END*/}

          <hr />

          {/*MISCELLANEOUS DIAMOND CONTAINER*/}
          <div className="misc-diam-container">
            <div className="d-flex align-items-center mb-3">
              <h4 className="me-2 m-0">Misc. Diamonds</h4>
              <input
                type="number"
                onChange={handleChange.bind(this, "miscWeight")}
                className="form-control text-center"
                value={formData["miscWeight"]}
                aria-label="Grams"
                style={{ borderBottom: "1px solid black", borderRadius: 0 }}
              />
              <span>Ctw.</span>
            </div>

            <div className="input-group mb-3 pe-5">
              <label>$</label>
              <input
                type="number"
                onChange={handleChange.bind(this, "miscPrice")}
                className="form-control text-center"
                aria-label="Rate"
                value={formData["miscPrice"]}
                style={{ borderBottom: "1px solid grey", borderRadius: 0 }}
              />

              <label className={"me-3"}>=</label>
              <label>{formData["miscTotal"].toFixed(2)}</label>
            </div>
          </div>
          {/*MISCELLANEOUS DIAMOND CONTAINER END*/}

          <hr />

          {/*TOTAL CONTAINER*/}
          <div className="total-container">
            <form className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <h3 className="text-primary">Grand Total</h3>
                  {/*<button onClick={clipBoadHandler} className="btn copy">*/}
                  {/*<img src={copy} alt="Copy to clipboard"/>*/}
                  <h3 onClick={resetForm}>Clear</h3>
                  {/*</button>*/}
                </div>
                <div className="p-2 row position-relative" style={{ border: "1px solid grey" }}>
                  <div className="col">
                    {[275, 300, 350, 400, 450].map((value) => {
                      return (
                        <div className="input-group" key={value}>
                          <span className="fs-5">${value} / ct = </span>
                          <span className={"fs-5 ms-2"}>
                            {isNaN(parseFloat(formData["roundWeight"]))
                              ? Math.ceil(
                                  ((formData["totalWithoutRound"] + 0 * value) *
                                    1.28) /
                                    10
                                ) * 10
                              : Math.ceil(
                                  ((formData["totalWithoutRound"] +
                                    value * formData["roundWeight"]) *
                                    1.28) /
                                    10
                                ) * 10}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="col-12 mt-2">
                    <p className="text-muted" style={{ fontSize: '16px', width: '100%' }}>
                      Including 15% Tariff.
                    </p>
                  </div>

                  <div className="position-absolute end-0 ps-0 w-auto">
                    <button onClick={clipBoadHandler} className="btn copy">
                      <img src={copy} alt="Copy to clipboard" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/*TOTAL CONTAINER END*/}


          {/*/!*TOTAL CONTAINER 2*!/*/}
          {/*<div className="total-container mt-4">*/}
          {/*  <form className="row">*/}
          {/*    <div className="col-12">*/}

          {/*      <div className="p-2 row" style={{ border: "1px solid grey" }}>*/}
          {/*        <div className="col">*/}
          {/*          {[{name:'TTLB',value:275}, {name:'SI',value:300}, {name:'SI/ VS', value:350}, {name:'VS',value:400}, {name:'VS/ VVS', value:450}].map((value) => {*/}
          {/*            return (*/}
          {/*              <div className="input-group" key={value.name}>*/}
          {/*                <span className="fs-5">{value.name} = </span>*/}
          {/*                /!*<span className="fs-5">Si/ Vs = </span>*!/*/}
          {/*                /!*<span className="fs-5">Vs = </span>*!/*/}
          {/*                /!*<span className="fs-5">Vs/ Vvs = </span>*!/*/}
          {/*                <span className={"fs-5 ms-2"}>$*/}
          {/*                  {isNaN(parseFloat(formData["roundWeight"]))*/}
          {/*                    ? Math.ceil(*/}
          {/*                        ((formData["totalWithoutRound"] + 0 * value.value) **/}
          {/*                          1.28) /*/}
          {/*                          10*/}
          {/*                      ) * 10*/}
          {/*                    : Math.ceil(*/}
          {/*                        ((formData["totalWithoutRound"] +*/}
          {/*                          value.value * formData["roundWeight"]) **/}
          {/*                          1.28) /*/}
          {/*                          10*/}
          {/*                      ) * 10}*/}
          {/*                </span>*/}
          {/*              </div>*/}
          {/*            );*/}
          {/*          })}*/}
          {/*        </div>*/}

          {/*        <div className="col-1 d-flex justify-content-end align-items-start">*/}
          {/*          <button onClick={clipBoadHandler2} className="btn copy">*/}
          {/*            <img src={copy} alt="Copy to clipboard" />*/}
          {/*          </button>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </form>*/}
          {/*</div>*/}
          {/*/!*TOTAL CONTAINER 2 END*!/*/}

        </form>
      </section>
    </>
  );
}

export default App;