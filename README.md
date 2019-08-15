# nemo-assist

It's an innovative and hassle free way to write Ft's. This is a UI framework which allows you to write FT via drag and drop.

It's based on simple lego block concept where `legos` are the basic Code Components(configurable) which can be chained together to form 
`blocks` (analogous to forms or pages)  which can be joined together to form `flows` (entire FT). 

You can start writing Ft's in these simple steps.


- Install, Presently it's in beta phase(published beta version), Will add few more utilities and publish the 1.0.0v in paypal npm repository. 
```$xslt
npm i nemo@latest

npm install nemo-assist@beta or npm install nemo-assist@0.0.16-beta
```

- Init (creates basic folder structure)
```$xslt
./node_modules/.bin/nemo-assist init -f <folderPath>
```

- Open The UI To Start Creating FT's
```$xslt
./node_modules/.bin/nemo-assist gui -f <folderPath>
```

- Run a already created FT
```$xslt
./node_modules/.bin/nemo-assist run -f <folderPath> -n <ftName>

grep command (can run and  publish report for multiple testcases that too it runs in parallel)
./node_modules/.bin/nemo-assist run -f <folderPath> -g <grepCommand>

```


## What do you get out of box with nemo-assist
- No Need to separately integrate Nemo, and write extra Code to maintain different testcases
- All test cases run in parallel
- Reporting
- Basic Configurable Legos, which are used more frequently while writing FT's


## Existing Legos 
For now it supports following utilities:

[DocUpload](https://github.paypal.com/pages/deegarg/nemo-assist/global.html#DocUpload)
,[elementClick](https://github.paypal.com/pages/deegarg/nemo-assist/global.html#elementClick)
,[normalizedLocator](https://github.paypal.com/pages/deegarg/nemo-assist/global.html#normalizedLocator)
,[selectDropdownOption](https://github.paypal.com/pages/deegarg/nemo-assist/global.html#selectDropdownOption)
,[textInputEnter](https://github.paypal.com/pages/deegarg/nemo-assist/global.html#textInputEnter)
,[waitTillVanish](https://github.paypal.com/pages/deegarg/nemo-assist/global.html#waitTillVanish)

## Documentation
Find the detailed documentation for Legos [here](https://github.paypal.com/pages/deegarg/nemo-assist).


## PS
If you like the idea of writing FT via UI, Please hit start to the repo, will encourage us to contribute more into this project :P