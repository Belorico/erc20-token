async function main() {
  const initialSupply = ethers.utils.parseUnits('1000', 18);  // 1000 tokens with 18 decimals
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(initialSupply);

  await myToken.deployed();
  console.log("MyToken deployed to:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
