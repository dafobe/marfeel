define(function () {
	
	var _numberWithSeparator = function(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	}
	
	var _addCurrency = function(amount, currency) {
		var a = _numberWithSeparator(amount);
	    return currency === 'EUR'?a+'€':'$'+a;
	}
	
	var _addPercentage = function(x) {
	    return x+'%';
	}
	
	// ===== Public API ==== // 
	return {
		numberWithSeparator: _numberWithSeparator,
		addCurrency: _addCurrency,
		addPercentage: _addPercentage
	}
});