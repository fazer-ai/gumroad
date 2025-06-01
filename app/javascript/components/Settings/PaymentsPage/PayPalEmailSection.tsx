import cx from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { FormFieldName, PayoutMethod } from "$app/components/server-components/Settings/PaymentsPage";

const PayPalEmailSection = ({
  countrySupportsNativePayouts,
  showPayPalPayoutsFeeNote,
  isFormDisabled,
  paypalEmailAddress,
  setPaypalEmailAddress,
  hasConnectedStripe,
  feeInfoText,
  updatePayoutMethod,
  errorFieldNames,
}: {
  countrySupportsNativePayouts: boolean;
  showPayPalPayoutsFeeNote: boolean;
  isFormDisabled: boolean;
  paypalEmailAddress: string | null;
  setPaypalEmailAddress: (newPaypalEmailAddress: string) => void;
  hasConnectedStripe: boolean;
  feeInfoText: string;
  updatePayoutMethod: (payoutMethod: PayoutMethod) => void;
  errorFieldNames: Set<FormFieldName>;
}) => {
  const { t } = useTranslation('settings');
  const uid = React.useId();
  return (
    <section style={{ display: "grid", gap: "var(--spacer-6)" }}>
      {showPayPalPayoutsFeeNote ? (
        <div className="info" role="status">
          {t("payments.paypal_fee_note")}
        </div>
      ) : null}
      <div>{feeInfoText}</div>
      <div>
        {countrySupportsNativePayouts && !isFormDisabled ? (
          <button className="link" onClick={() => updatePayoutMethod("bank")}>
            {t("payments.switch_to_direct_deposit")}
          </button>
        ) : null}
        <fieldset className={cx({ danger: errorFieldNames.has("paypal_email_address") })}>
          <legend>
            <label htmlFor={`${uid}-paypal-email`}>{t("payments.paypal_email")}</label>
          </legend>
          <input
            type="email"
            id={`${uid}-paypal-email`}
            placeholder={t("payments.paypal_email")}
            value={paypalEmailAddress || ""}
            disabled={isFormDisabled}
            aria-invalid={errorFieldNames.has("paypal_email_address")}
            onChange={(evt) => setPaypalEmailAddress(evt.target.value)}
          />
        </fieldset>
        {hasConnectedStripe ? (
          <div role="alert" className="warning">
            {t("payments.cannot_change_to_paypal")}
          </div>
        ) : null}
      </div>
    </section>
  );
};
export default PayPalEmailSection;
