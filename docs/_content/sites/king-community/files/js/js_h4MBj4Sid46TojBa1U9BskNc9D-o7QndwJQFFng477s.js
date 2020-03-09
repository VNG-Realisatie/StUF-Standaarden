Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n!=1)); }, 'strings': {"":{"An AJAX HTTP error occurred.":"Er is een AJAX HTTP fout opgetreden.","HTTP Result Code: !status":"HTTP-resultaatcode: !status","An AJAX HTTP request terminated abnormally.":"Een AJAX HTTP-aanvraag is onverwacht afgebroken","Debugging information follows.":"Debug informatie volgt.","Path: !uri":"Pad: !uri","StatusText: !statusText":"Statustekst: !statusText","ResponseText: !responseText":"Antwoordtekst: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Please wait...":"Even geduld...","Shortcuts":"Snelkoppelingen","Select all":"Alles selecteren","(active tab)":"(actieve tabblad)","Hide":"Verbergen","Show":"Weergeven","Edit":"Bewerken","Autocomplete popup":"Popup voor automatisch aanvullen","Searching for matches...":"Zoeken naar overeenkomsten...","No results":"Geen resultaten","All":"Alle","New":"Nieuwe","No modules added within the last week.":"Afgelopen week zijn er geen modules toegevoegd.","No modules were enabled or disabled within the last week.":"Afgelopen week zijn geen modules ingeschakeld of uitgeschakeld.","Configure":"Instellen","Loading token browser...":"Tokenbrowser laden...","Available tokens":"Beschikbare tokens","Insert this token into your form":"Plaats deze token in uw formulier","First click a text field to insert your tokens into.":"Klik eerst een tekstveld aan om uw tokens in te plaatsen.","Hide summary":"Samenvatting verbergen","Edit summary":"Samenvatting bewerken","New revision":"Nieuwe revisie","No revision":"Geen revisie","By @name on @date":"Door @name op @date","By @name":"Door @name","Not published":"Niet gepubliceerd","@number comments per page":"@number reacties per pagina","Automatic alias":"Automatische alias","Alias: @alias":"Alias: @alias","No alias":"Geen alias","@label: @value":"@label: @value","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Het bestand %filename kan niet ge\u00fcpload worden. Alleen bestanden met de volgende extensies zijn toegestaan: %extensions","Re-order rows by numerical weight instead of dragging.":"Herschik de rijen op basis van gewicht, in plaats van slepen.","Show row weights":"Gewicht van rijen tonen","Hide row weights":"Gewicht van rij verbergen","Drag to re-order":"Slepen om de volgorde te wijzigen","Changes made in this table will not be saved until the form is submitted.":"Wijzigingen in deze tabel worden pas opgeslagen wanneer het formulier wordt ingediend.","Customize dashboard":"Dashboard aanpassen","Done":"Gereed","Not restricted":"Geen beperking","Restricted to certain pages":"Beperkt tot bepaalde pagina\u0027s","Not customizable":"Niet aanpasbaar","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"Wijzigingen aan de blokken worden pas opgeslagen wanneer u de knop \u003Cem\u003EBlokken opslaan\u003C\/em\u003E aanklikt.","The block cannot be placed in this region.":"Het blok kan niet worden geplaatst in dit gebied.","Requires a title":"Een titel is verplicht","Don\u0027t display post information":"Geen berichtinformatie weergeven","@title dialog":"@title dialoog","Loading":"Laden","Enabled":"Ingeschakeld","Disabled":"Uitgeschakeld","Add":"Toevoegen","Menu":"Menu","Select all rows in this table":"Selecteer alle regels van deze tabel","Deselect all rows in this table":"De-selecteer alle regels van deze tabel","This permission is inherited from the authenticated user role.":"Dit toegangsrecht is ge\u00ebrfd van de rol \u0027geverifieerde gebruiker\u0027.","Also allow !name role to !permission?":"Mag !name ook !permission?","hours":"uren","seconds":"seconden","minutes":"minuten","Open file browser":"Bestandsbrowser openen","Remove group":"Groep verwijderen","Apply (all displays)":"Toepassen (alle weergaven)","Apply (this display)":"Toepassen (deze weergave)","Revert to default":"Terugzetten naar standaard","Change profile":"Profiel wijzigen","Downloads":"Downloads","Not tracked":"Niet gevolgd","One domain with multiple subdomains":"E\u00e9n domein met meerdere subdomeinen","Multiple top-level domains":"Meerdere topniveau domeinnamen","All pages with exceptions":"Alle pagina\u0027s met uitzonderingen","Excepted: @roles":"Uitgezonderd: @roles","A single domain":"Een enkel domein","Universal web tracking opt-out":"Universele web tracking opt-out.","No privacy":"Geen privacy","@items enabled":"@items ingeschakeld","Outbound links":"Externe links","Mailto links":"Mailto-links","AdSense ads":"AdSense-advertenties","Anonymize IP":"IP-adres anonimiseren","No redirects":"Geen omleidingen","1 redirect":"1 omleiding","@count redirects":"@count omleidingen","Colorbox":"Colorbox"}} };;

(function($) {
  Drupal.behaviors.CToolsJumpMenu = {
    attach: function(context) {
      $('.ctools-jump-menu-hide')
        .once('ctools-jump-menu')
        .hide();

      $('.ctools-jump-menu-change')
        .once('ctools-jump-menu')
        .change(function() {
          var loc = $(this).val();
          var urlArray = loc.split('::');
          if (urlArray[1]) {
            location.href = urlArray[1];
          }
          else {
            location.href = loc;
          }
          return false;
        });

      $('.ctools-jump-menu-button')
        .once('ctools-jump-menu')
        .click(function() {
          // Instead of submitting the form, just perform the redirect.

          // Find our sibling value.
          var $select = $(this).parents('form').find('.ctools-jump-menu-select');
          var loc = $select.val();
          var urlArray = loc.split('::');
          if (urlArray[1]) {
            location.href = urlArray[1];
          }
          else {
            location.href = loc;
          }
          return false;
        });
    }
  }
})(jQuery);
;
/**
 * @file
 * Attaches behaviors for the Chosen module.
 */

(function($) {
  Drupal.behaviors.chosen = {
    attach: function(context, settings) {
      settings.chosen = settings.chosen || Drupal.settings.chosen;

      // Prepare selector and add unwantend selectors.
      var selector = settings.chosen.selector;

      // Function to prepare all the options together for the chosen() call.
      var getElementOptions = function (element) {
        var options = $.extend({}, settings.chosen.options);

        // The width default option is considered the minimum width, so this
        // must be evaluated for every option.
        if (settings.chosen.minimum_width > 0) {
          if ($(element).width() < settings.chosen.minimum_width) {
            options.width = settings.chosen.minimum_width + 'px';
          }
          else {
            options.width = $(element).width() + 'px';
          }
        }

        // Some field widgets have cardinality, so we must respect that.
        // @see chosen_pre_render_select()
        if ($(element).attr('multiple') && $(element).data('cardinality')) {
          options.max_selected_options = $(element).data('cardinality');
        }

        return options;
      };

      // Process elements that have opted-in for Chosen.
      // @todo Remove support for the deprecated chosen-widget class.
      $('select.chosen-enable, select.chosen-widget', context).once('chosen', function() {
        options = getElementOptions(this);
        $(this).chosen(options);
      });

      $(selector, context)
        // Disabled on:
        // - Field UI
        // - WYSIWYG elements
        // - Tabledrag weights
        // - Elements that have opted-out of Chosen
        // - Elements already processed by Chosen.
        .not('#field-ui-field-overview-form select, #field-ui-display-overview-form select, .wysiwyg, .draggable select[name$="[weight]"], .draggable select[name$="[position]"], .chosen-disable, .chosen-processed')
        .filter(function() {
          // Filter out select widgets that do not meet the minimum number of
          // options.
          var minOptions = $(this).attr('multiple') ? settings.chosen.minimum_multiple : settings.chosen.minimum_single;
          if (!minOptions) {
            // Zero value means no minimum.
            return true;
          }
          else {
            return $(this).find('option').length >= minOptions;
          }
        })
        .once('chosen', function() {
          options = getElementOptions(this);
          $(this).chosen(options);
        });
    }
  };
})(jQuery);
;
