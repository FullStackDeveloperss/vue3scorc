export interface Autofill {
  fields: Fields;
  hints: Hints;
}

interface Hints {
  dolphin_fixer_enable: string;
}

export interface Fields {
  [index: string]: any
  creative_folder_path: string;
  cards_list: string;
  company_for_import: string;
  dolphin_transfer_accountes: boolean;
  dolphin_token: string;
  dolphin_farm_days_to_transfer: number;
  dolphin_have_friends_to_transfer: number;
  dolphin_fixer_enable: boolean;
  dolphin_threads: number;
  dolphin_delete_from_farm_on_transfer: boolean;
  dolphin_turnoff_farm_on_transfer: boolean;
}
