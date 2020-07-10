const jsonName = 'Luis.json';
const data = require(`./${jsonName}`);

class jsonAnalyzer {
    constructor(data) {
        this.data = data.sort((firstEntry, secondEntry) => {
            if (firstEntry.codeId && secondEntry.codeId && firstEntry.codeId > secondEntry.codeId) {
                return 1;
            }
            if (firstEntry.codeId && secondEntry.codeId && firstEntry.codeId < secondEntry.codeId) {
                return -1;
            }
            return 0;
        });
        this.findings = ``;
    }

    validCharacters(codeId) {
        let invalidCharacters = [` `, `_`, `/`, `?`, `|`, `"`,`'`, `^`, `!`, `\\`, `¡`, `*`, `+`, `[`, `]`, `{`, `}`, `¿`];
        for(let character of invalidCharacters) {
            if(codeId.includes(character)) {
                return false;
            }
        }
        return true;
    }

    analyzeData() {
        let previousEntry = {};
        for(let entry of this.data) {
            //CodeId Present Validation
            if(!entry.codeId){
                this.findings += `Missing codeId: ${entry.title}\n`;
            }
            else {
                //Valid Characters Validation
                if(!this.validCharacters(entry.codeId)) {
                    this.findings += `Invalid character found in the following codeId: ${entry.codeId}\n`;
                }
                //Length Validation
                if(!this.validCharacters(entry.codeId)) {
                    this.findings += `Invalid character found in the following codeId: ${entry.codeId}\n`;
                }
                //Duplicate CodeId Validation
                if(previousEntry.codeId && previousEntry.codeId === entry.codeId) {
                    this.findings += `Duplicated codeId: ${entry.codeId}\n`;
                }
            }
            
            //Logging previous entry
            previousEntry = entry;
        }
    }

    showFindings() {
        return `==Findings==\n${this.findings ? this.findings : 'N/A'}`;
    }
}

let analyzer = new jsonAnalyzer(data);

analyzer.analyzeData();
console.log(analyzer.showFindings());