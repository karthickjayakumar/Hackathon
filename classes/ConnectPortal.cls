Public Class ConnectPortal{

    @AuraEnabled
    public static List<Account> getAccounts(Id recordid){
        system.debug(recordid);
        List<Account> accList = new List<Account>();
        return accList;
    }
}