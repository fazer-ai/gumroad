import * as React from "react";
import { useTranslation } from "react-i18next";

import { deleteProduct, archiveProduct, unarchiveProduct, duplicateProduct } from "$app/data/product_dashboard";
import { Membership, Product } from "$app/data/products";
import { assertResponseError } from "$app/utils/request";

import { Button } from "$app/components/Button";
import { Icon } from "$app/components/Icons";
import { Modal } from "$app/components/Modal";
import { Popover } from "$app/components/Popover";
import { showAlert } from "$app/components/server-components/Alert";

const ActionsPopover = ({
  product,
  onDuplicate,
  onDelete,
  onArchive,
  onUnarchive,
}: {
  product: Product | Membership;
  onDuplicate: () => void;
  onDelete: () => void;
  onArchive: () => void;
  onUnarchive: (hasRemainingArchivedProducts: boolean) => void;
}) => {
  const { t } = useTranslation('dashboard');
  const [open, setOpen] = React.useState(false);
  const [isDuplicating, setIsDuplicating] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [confirmingDelete, setConfirmingDelete] = React.useState(false);
  const [isArchiving, setIsArchiving] = React.useState(false);
  const [isUnarchiving, setIsUnarchiving] = React.useState(false);

  const handleDuplicate = async () => {
    setIsDuplicating(true);
    showAlert(t("actions.duplicating_notification"), "info");
    try {
      await duplicateProduct(product.permalink, product.name);
      showAlert(t("actions.product_duplicated", { name: product.name }), "success");
      onDuplicate();
    } catch (e) {
      assertResponseError(e);
      showAlert(e.message, "error");
    }
    setOpen(false);
    setIsDuplicating(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(product.permalink);
      showAlert(t("actions.product_deleted"), "success");
      onDelete();
    } catch (e) {
      assertResponseError(e);
      showAlert(e.message, "error");
    }
    setIsDeleting(false);
  };

  const handleArchive = async () => {
    setIsArchiving(true);
    try {
      await archiveProduct(product.permalink);
      showAlert(t("actions.product_archived"), "success");
      onArchive();
    } catch (e) {
      assertResponseError(e);
      showAlert(e.message, "error");
    }
    setIsArchiving(false);
  };

  const handleUnarchive = async () => {
    setIsUnarchiving(true);
    try {
      const archivedProductsCount = await unarchiveProduct(product.permalink);
      showAlert(t("actions.product_unarchived"), "success");
      onUnarchive(archivedProductsCount > 0);
    } catch (e) {
      assertResponseError(e);
      showAlert(e.message, "error");
    }
    setIsUnarchiving(false);
  };

  return (
    <>
      <Popover
        open={open}
        onToggle={setOpen}
        aria-label={t("actions.open_product_menu")}
        trigger={<Icon name="three-dots" />}
      >
        <div role="menu">
          <div role="menuitem" inert={!product.can_duplicate || isDuplicating} onClick={() => void handleDuplicate()}>
            <Icon name="outline-duplicate" />
            &ensp;{isDuplicating ? t("actions.duplicating") : t("actions.duplicate")}
          </div>
          {product.can_unarchive ? (
            <div role="menuitem" inert={isUnarchiving} onClick={() => void handleUnarchive()}>
              <Icon name="archive" />
              &ensp;{isUnarchiving ? t("actions.unarchiving") : t("actions.unarchive")}
            </div>
          ) : null}
          {product.can_archive ? (
            <div role="menuitem" inert={isArchiving} onClick={() => void handleArchive()}>
              <Icon name="archive" />
              &ensp;{isArchiving ? t("actions.archiving") : t("actions.archive")}
            </div>
          ) : null}
          <div
            className="danger"
            inert={!product.can_destroy || isDeleting}
            role="menuitem"
            onClick={() => setConfirmingDelete(true)}
          >
            <Icon name="trash2" />
            &ensp;{isDeleting ? t("actions.deleting") : t("actions.delete_permanently")}
          </div>
        </div>
      </Popover>
      {confirmingDelete ? (
        <Modal
          open
          onClose={() => setConfirmingDelete(false)}
          title={t("actions.delete_product")}
          footer={
            <>
              <Button onClick={() => setConfirmingDelete(false)} disabled={isDeleting}>
                {t("actions.cancel")}
              </Button>
              <Button color="danger" onClick={() => void handleDelete()} disabled={isDeleting}>
                {isDeleting ? t("actions.deleting") : t("actions.confirm")}
              </Button>
            </>
          }
        >
          <h4>{t("actions.confirm_delete_product", { name: product.name })}</h4>
        </Modal>
      ) : null}
    </>
  );
};

export default ActionsPopover;
